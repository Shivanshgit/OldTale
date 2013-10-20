#pragma strict

public var mcTarget: GameObject;
public var mcFullScreenRect = Rect(0.0, 0.0, 1.0, 1.0);
public var mcCompactModeRect = Rect(0.7, 0.7, 0.3, 0.3);
public var mcFullScreen = false;

private var mcTargetsTranform: Transform;
private var mcGameDirector: GameDirector;

function Awake ()
{
    // we are looking after Player by default, so if target is not set -> follow player's gameObject.
    if (mcTarget == null)
    {
        mcTarget = GameObject.FindGameObjectWithTag("Player");
    }
}

function Start()
{
    if (mcTarget != null)
    {
        mcTargetsTranform = mcTarget.transform;
    }
    var mainGameObject = GameObject.FindGameObjectWithTag("GameDirector");
    if (mainGameObject)
    {
        var directorComponent: GameDirectorComponent;
        directorComponent = mainGameObject.GetComponent(GameDirectorComponent);
        mcGameDirector = directorComponent.getGameDirector();
    }
    if (mcGameDirector)
    {
        mcGameDirector.onFullScreenUIElementShown(mcFullScreen);
    }
    camera.rect = mcFullScreen ? mcFullScreenRect : mcCompactModeRect;
}

function Update ()
{
    // camera should always be on top of a target.
    if (mcTargetsTranform != null)
    {
        transform.position.x = mcTargetsTranform.position.x;
        transform.position.z = mcTargetsTranform.position.z;
    }
}

function updateTarget(newTarget: GameObject)
{
    mcTarget = newTarget;
    if (mcTarget != null)
    {
        mcTargetsTranform = mcTarget.transform;
    }
}

function showFullScreen(fullScreen: boolean)
{
    mcFullScreen = fullScreen;
    // TODO: fix hardcoded values
    if (fullScreen)
    {
        camera.rect = mcFullScreenRect;
    }
    else
    {
        camera.rect = mcCompactModeRect;
    }

    if (mcGameDirector)
    {
        mcGameDirector.onFullScreenUIElementShown(fullScreen);
    }
}