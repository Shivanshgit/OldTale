#pragma strict

/**
 * @brief Base class for all Dialogs.
 */
public class BaseDialog
{
    /// Constructor
    public function BaseDialog()
    {
        mOnDone = null;
    }

    /// @brief draws dialog on a screen.
    public function draw()
    {
    }

    /// @brief should be called when we want to skip dialog
    public function skip()
    {
        mShown = false;
        if (mOnDone != null)
        {
            mOnDone(this);
        }
    }

    /**
     * @brief @c true if Dialog should be shown and @c false otherwise.
     * If this property is set to @c false. Dialog will not do anything
     * during draw() call.
     */
    var mShown = false;
    public function get Shown(): boolean
    {
        return mShown;
    }
    public function set Shown(value: boolean)
    {
        mShown = value;
    }

    /**
     * @brief specifies
     */
    var mHeight = Screen.height / 4;
    public function get Height(): float
    {
        return mHeight;
    }
    public function set Height(value: float)
    {
        mHeight = value;
    }

    /**
     * @brief this property holds a callback that will be called when this Dialog is
     * 'done', which is mean that it showed everything what it should (or skiped, etc.).
     */
    var mOnDone: Function;
    public function get OnDone(): Function
    {
        return mOnDone;
    }
    public function set OnDone(value: Function)
    {
        mOnDone = value;
    }
}