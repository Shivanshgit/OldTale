#pragma strict

public var repeatable = false;

private var mcWasShown = false;
private var mcGameDirector: GameDirector;
private var mcDialogService: DialogService;

function Start()
{
    /// find and store GameDirector.
    var foundGameObject = GameObject.FindGameObjectWithTag("GameDirector");
    if (foundGameObject)
    {
        var directorComponent: GameDirectorComponent;
        directorComponent = foundGameObject.GetComponent(GameDirectorComponent);
        mcGameDirector = directorComponent.getGameDirector();
    }

    /// find and store DialogService.
    foundGameObject = GameObject.FindGameObjectWithTag("DialogService");
    if (foundGameObject)
    {
        var dialogService: DialogServiceComponent;
        dialogService = foundGameObject.GetComponent(DialogServiceComponent);
        mcDialogService = dialogService.getDialogService();
    }
}

function OnTriggerEnter(other : Collider)
{
    // show dialog if player entered area
    if (other.tag == "Player" && (!mcWasShown || repeatable))
    {
        // TODO: we should use some public property to set all necessary values for a dialog (like text, type, etc.)
        var cutSceneDialog = new CutSceneDialog();
        mcDialogService.showDialog(cutSceneDialog);
        mcWasShown = true;
    }
}