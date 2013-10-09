#pragma strict

public class CutSceneDialog extends BaseDialog
{
    public function CutSceneDialog()
    {
        mYPosition = Screen.height - mHeight;
    }

    public function CutSceneDialog(onDialogCallback: Function)
    {
        mYPosition = Screen.height - mHeight;
        mOnDone = onDialogCallback;
    }

    /// @brief draws dialog on a screen.
    public function draw()
    {
        if (mShown)
        {
            GUI.Box(Rect(0.0f, mYPosition , Screen.width, mHeight), "Some text is shown here and so on.");
        }
    }

    private var mYPosition: float;
}