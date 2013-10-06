#pragma strict

/**
 * @brief Base class for all GUI elements like Buttons, ToggleButtons, etc.
 */
public class GUIObject
{

    /// @brief Constructor
    public function GUIObject()
    {}

    /**
     * @brief Typically should be overridden by other classes.
     * Should draw this GUI object.
     */
    public function drawObject()
    {}

    /**
     * @brief Object's left X position.
     */
    var m_XPosition = 0;
    public function get XPosition(): int
    {
        return m_XPosition;
    }
    public function set XPosition(value: int)
    {
        m_XPosition = value;
    }

    /**
     * @brief Object's left Y position.
     */
    var m_YPosition = 0;
    public function get YPosition(): int
    {
        return m_YPosition;
    }
    public function set YPosition(value: int)
    {
        m_YPosition = value;
    }
}

private var mc_GUIObject = new GUIObject();

function Update () {
    mc_GUIObject.drawObject();
}