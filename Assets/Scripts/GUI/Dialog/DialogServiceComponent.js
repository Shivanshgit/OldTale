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
        if (mCurrentDialog == BaseDialog)
        {
            mGameDirector.onDialogFinished(mCurrentDialog);
            mCurrentDialog.Shown = false;
            mCurrentDialog = null;
        }
    }

    public function drawDialog()
    {
        if (mCurrentDialog != null)
        {
            mCurrentDialog.draw();
        }
    }

    private var mCurrentDialog: BaseDialog;
    private var mGameDirector: GameDirector;
}

var mc_DialogService: DialogService;
var mc_gameDirector: GameDirector;

function Start()
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

function getDialogService(): DialogService
{
    return mc_DialogService;
}
