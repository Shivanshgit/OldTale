#pragma strict
/**
 * @brief MainMenuGameDirector is used to process all MainMenu related requests.
 */
public var mainMenuEnabledAtStart = false;
public var menusObject: GameObject;
public var mainMenuOptions = new List.<String>();
public var spaceBetweenButtons = 60;
public var buttonsWidth = 100;
public var buttonsHeight = 50;

private var mainMenu: MainMenuComponent;
private var gameDirector: GameDirector;

function Start()
{
    var menuGUIService: GUIService;
    menuGUIService = createGUIService(mainMenuEnabledAtStart);
    mainMenu = menusObject.AddComponent(MainMenuComponent);
    mainMenu.getMainMenu().GUIService = menuGUIService;

    var mainGameObject = GameObject.FindGameObjectWithTag("GameDirector");
    if (mainGameObject)
    {
        var directorComponent: GameDirectorComponent;
        directorComponent = mainGameObject.GetComponent(GameDirectorComponent);
        gameDirector = directorComponent.getGameDirector();
    }
}

function createGUIService(bShown: boolean) : GUIService
{
    var result: GUIService;
    result = new GUIService(bShown);
    var newObject: GUIObject;

    for(var i : int = 0; i < mainMenuOptions.Count; i++)
    {
        switch(i)
        {
            case 0: // New Game Button
                newObject = new MenuButton(mainMenuOptions[i], Screen.width / 2, Screen.height / 2, buttonsWidth, buttonsHeight, onNewGamePressed);
                break;
            default: // for now it is only for Exit Button, but idealy
                newObject = new MenuButton(mainMenuOptions[i], Screen.width / 2, Screen.height / 2 + spaceBetweenButtons, buttonsWidth, buttonsHeight, onExitButtonPressed);
                break;
         //TODO: fix this ^^^, it should be a general solution with a general callback. Enums as a Button's type? List of a callbacks just like for the names?
        }
        result.GUIOptions.Add(newObject);
    }

    return result;
}

function onExitButtonPressed()
{
    Application.Quit();
}

function onNewGamePressed()
{
    gameDirector.onStartNewGame();
}