#pragma strict

public var characterSectionBackground: Texture;
public var characterSectionWidth = 300;
public var characterSectionHeight = 100;

public var primaryActionIcon: Texture;
public var primaryActionIconWidth = 40;
public var primaryActionIconHeight = 30;

public var secondaryActionIcon: Texture;
public var secondaryActionIconWidth = 40;
public var secondaryActionIconHeight = 30;

public var spaceBetweenCharactersActions = 10;

public var onPrimaryActionPressed: Function;
public var onSecondaryActionPressed: Function;

public var showUIAtTheBeginning = true;

/**
 * @brief MainUIGameEventsListener class is sued for a GameEvents handling for Main Game's UI.
 */
class MainUIGameEventsListener extends GameEventsListener
{
    public function MainUIGameEventsListener(show: boolean)
    {
        mShowUI = show;
    }

    /**
     * @copydoc GameEventsListener.onGamePausedChanged()
     */
    public function onGamePausedChanged(paused: boolean)
    {
        mShowUI = !paused;
    }

    var mShowUI: boolean;
    public function get ShowUI(): boolean
    {
        return mShowUI;
    }
    public function set ShowUI(value: boolean)
    {
        mShowUI = value;
    }

    private var mGameObject: GameObject;
    private var mComponent: MonoBehaviour;
}

private var characterSectionXPos = 0;
private var characterSectionYPos = 0;
private var gameEventsListener: MainUIGameEventsListener;
private var gameDirector: GameDirector;

function Awake()
{
    characterSectionYPos = Screen.height - characterSectionHeight;
}

function Start()
{
    var mainGameObject = GameObject.FindGameObjectWithTag("GameDirector");
    if (mainGameObject)
    {
        var directorComponent: GameDirectorComponent;
        directorComponent = mainGameObject.GetComponent(GameDirectorComponent);
        gameDirector = directorComponent.getGameDirector();
        if (gameDirector)
        {
            gameEventsListener = new MainUIGameEventsListener(showUIAtTheBeginning);
            gameDirector.addGameListener(gameEventsListener);
        }
    }
}

function OnGUI(){
    if (!gameEventsListener.ShowUI)
    {
        return;
    }
    // Character's section
    GUI.BeginGroup(Rect(characterSectionXPos, characterSectionYPos , characterSectionWidth, characterSectionHeight));
    // Section's Background
    GUI.Box(Rect(0, 0, characterSectionWidth, characterSectionHeight), characterSectionBackground);

    // Icon and buttons placement.
    if (GUI.Button(Rect(100, characterSectionHeight / 2, primaryActionIconWidth, primaryActionIconHeight), primaryActionIcon))
    {
        if(onPrimaryActionPressed)
        {
            onPrimaryActionPressed();
        }
    }
    GUI.Button(Rect(100 + primaryActionIconWidth + spaceBetweenCharactersActions, characterSectionHeight / 2,
                    primaryActionIconWidth, primaryActionIconHeight), secondaryActionIcon);
    GUI.EndGroup();
    // END of a character's section
}