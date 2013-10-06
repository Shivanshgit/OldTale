#pragma strict

public var mc_bKeepThisMainMenuOnLoad = false;

public class MainMenu
{
    /// properties

    /**
     * @brief MenuService that is used by a MainMenu. Contains a list of options for a MainMenu.
     */
    var m_GUIService: GUIService;
    public function getGUIService(): GUIService
    {
        return m_GUIService;
    }

    public function setGUIService(value: GUIService)
    {
        m_GUIService = value;
    }

    /// simple public properties. No need to create a get/set methods for them.

    public var m_bKeepAfterSceneLoad = false;

    /// Constructor
    public function MainMenu(bKeepAfterSceneLoad: boolean)
    {
        m_bKeepAfterSceneLoad = bKeepAfterSceneLoad;
        m_GUIService = null;
    }

}

private var mc_MainMenu = new MainMenu(mc_bKeepThisMainMenuOnLoad);

function Awake ()
{
    if (mc_MainMenu.m_bKeepAfterSceneLoad)
    {
        DontDestroyOnLoad(this);
    }
}

function OnGUI()
{
    if (Input.GetButtonDown("OpenMainMenu"))
    {
        if (mc_MainMenu.getGUIService())
        {
            mc_MainMenu.getGUIService().GUIShown = !mc_MainMenu.getGUIService().GUIShown;
        }
    }
    if (mc_MainMenu.getGUIService() && mc_MainMenu.getGUIService().GUIShown)
    {
        GUI.Box(Rect(0.0f, 0.0f, Screen.width, Screen.height), "OldTale");
        if (mc_MainMenu.getGUIService().getGUIOptionsCount() > 0)
        {
            // create menu items.
        }
    }
}

function getMainMenu(): MainMenu
{
    return mc_MainMenu;
}