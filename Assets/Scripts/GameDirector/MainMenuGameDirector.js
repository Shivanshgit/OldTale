#pragma strict
/**
 * @brief MainMenuGameDirector is used to process all MainMenu related requests.
 */
public var menusObject: GameObject;
public var optionsCount = 2;
public var spaceBetweenButtons = 60;
public var buttonsWidth = 100;
public var buttonsHeight = 50;

private var mainMenu: MainMenuComponent;

function Start()
{
    var menuGUIService: GUIService;
    menuGUIService = createGUIService(true);
    mainMenu = menusObject.AddComponent(MainMenuComponent);
    mainMenu.getMainMenu().GUIService = menuGUIService;
}

function createGUIService(bShown: boolean) : GUIService
{
    var result: GUIService;
    result = new GUIService(bShown);
    var newObject: GUIObject;

    for(var i : int = 0; i < optionsCount; i++)
    {
        switch(i)
        {
            case 0: /// New Game Button
                newObject = new MenuButton("New Game", Screen.width / 2, Screen.height / 2, buttonsWidth, buttonsHeight);
                break;
            case 1: /// Exit Button
                newObject = new MenuButton("Exit", Screen.width / 2, Screen.height / 2 + spaceBetweenButtons, buttonsWidth, buttonsHeight, onExitButtonClicked);
                break;;
            default:
                break;
        }
        result.GUIOptions.Add(newObject);
    }

    return result;
}

function onExitButtonClicked()
{
    Application.Quit();
}