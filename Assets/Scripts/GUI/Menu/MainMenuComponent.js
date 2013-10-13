#pragma strict
/**
 * @brief this component handles OnGUI() callbacks. Typically should be attached to an empty gameObject.
 */

/// will call DontDestroyOnLoad(this) if set to @c true which is mean that this component will not be destroyed when new Scene is loaded.
public var mc_bKeepThisMainMenuOnLoad = false;

public class MainMenu extends MenuEventsListener
{

    /// Constructor
    public function MainMenu(bKeepAfterSceneLoad: boolean, gameDirector: GameDirector)
    {
        m_bKeepAfterSceneLoad = bKeepAfterSceneLoad;
        m_GUIService = null;
        mGameDirector = gameDirector;
    }

    /// properties

    /**
     * @brief MenuService that is used by a MainMenu. Contains a list of options for a MainMenu.
     */
    var m_GUIService: GUIService;
    public function get GUIService(): GUIService
    {
        return m_GUIService;
    }

    public function set GUIService(value: GUIService)
    {
        if (m_GUIService != value)
        {
            m_GUIService = value;
        }
    }

    /// simple public properties. No need to create a get/set methods for them.

    public var m_bKeepAfterSceneLoad = false;

    /// @copydoc MenuEventsListener.onMenuEvent()
    public function onMenuEvent(event: MenuEvent)
    {
        if (m_GUIService)
        {
            m_GUIService.GUIShown = !m_GUIService.GUIShown;
            mGameDirector.onMainMenuShown(m_GUIService.GUIShown);
        }
    }

    private var mGameDirector: GameDirector;
}

var mc_MainMenu: MainMenu;
var mc_GameDirector: GameDirector;

function Awake ()
{
    var mainGameObject = GameObject.FindGameObjectWithTag("GameDirector");
    if (mainGameObject)
    {
        var directorComponent: GameDirectorComponent;
        directorComponent = mainGameObject.GetComponent(GameDirectorComponent);
        mc_GameDirector = directorComponent.getGameDirector();
    }
    if (mc_GameDirector)
    {
        mc_MainMenu = new MainMenu(mc_bKeepThisMainMenuOnLoad, mc_GameDirector);
        mc_GameDirector.addMenuListener(mc_MainMenu);
    }
    if (mc_bKeepThisMainMenuOnLoad)
    {
        DontDestroyOnLoad(this);
    }
}

function Start()
{
}

function Update()
{
}

function OnGUI()
{
    if (mc_MainMenu.GUIService && mc_MainMenu.GUIService.GUIShown)
    {
        GUI.Box(Rect(0.0f, 0.0f, Screen.width, Screen.height), "OldTale");
        mc_MainMenu.GUIService.draw();
    }
}

function getMainMenu(): MainMenu
{
    return mc_MainMenu;
}