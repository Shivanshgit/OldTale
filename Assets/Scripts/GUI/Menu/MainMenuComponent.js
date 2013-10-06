#pragma strict
/**
 * @brief this component handles OnGUI() callbacks. Typically should be attached to an empty gameObject.
 */

/// will call DontDestroyOnLoad(this) if set to @c true which is mean that this component will not be destroyed when new Scene is loaded.
public var mc_bKeepThisMainMenuOnLoad = false;

public class MainMenu
{
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

function Update()
{
    if (Input.GetButtonDown("OpenMainMenu"))
    {
        if (mc_MainMenu.GUIService)
        {
            mc_MainMenu.GUIService.GUIShown = !mc_MainMenu.GUIService.GUIShown;
        }
    }
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