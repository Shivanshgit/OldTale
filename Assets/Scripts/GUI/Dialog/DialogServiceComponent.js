#pragma strict

/// @brief should be @c true if this service is used on a cut scene.
public var showCutDialogOnSceneStart = false;

/**
 * @brief this service handles all Dialog's related logic.
 */
public class DialogService
{
    public function DialogService(director: GameDirector)
    {
        mGameDirector = director;
        mCurrentDialog = null;
    }

    /**
     * @brief tells to DialgoService that it is time to show a dialog.
     */
    public function showDialog(dialog: BaseDialog)
    {
        mCurrentDialog = dialog;
        mCurrentDialog.OnDone = this.onDialogDone;
        mCurrentDialog.Shown = true;
        mGameDirector.onDialogShown(mCurrentDialog);
    }

    public function skipCurrentDialog()
    {
        if (mCurrentDialog != null)
        {
            mCurrentDialog.skip();
        }
    }

    public function onDialogDone(dialog: BaseDialog)
    {
        if (!Object.ReferenceEquals(mCurrentDialog, BaseDialog))
        {
            mGameDirector.onDialogFinished(mCurrentDialog);
            mCurrentDialog.Shown = false;
            mCurrentDialog = null;
        }
    }

    public function drawDialog()
    {
        if (mCurrentDialog != null && !mGameDirector.IsPaused)
        {
            mCurrentDialog.draw();
        }
    }

    private var mCurrentDialog: BaseDialog;
    private var mGameDirector: GameDirector;
}

private var mc_DialogService: DialogService;
private var mc_gameDirector: GameDirector;

function Awake()
{
    var mainGameObject = GameObject.FindGameObjectWithTag("GameDirector");
    if (mainGameObject)
    {
        var directorComponent: GameDirectorComponent;
        directorComponent = mainGameObject.GetComponent(GameDirectorComponent);
        mc_gameDirector = directorComponent.getGameDirector();
        mc_DialogService = new DialogService(mc_gameDirector);
        if (showCutDialogOnSceneStart)
        {
            var cutSceneDialog = new CutSceneDialog();
            mc_DialogService.showDialog(cutSceneDialog);
        }
    }
}

function Update()
{
    if (Input.GetButtonDown("SkipDialog"))
    {
        mc_DialogService.skipCurrentDialog();
    }
}

function OnGUI()
{
    mc_DialogService.drawDialog();
}


/// returns a DialogService
function getDialogService(): DialogService
{
    return mc_DialogService;
}
