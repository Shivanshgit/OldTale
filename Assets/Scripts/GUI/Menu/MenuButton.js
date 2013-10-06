#pragma strict


/**
 * @brief basic Menu Button object. Can be used with any GUIService.
 */
public class MenuButton extends GUIObject
{
    public function MenuButton(title: String)
    {
        m_sTitle = title;
    }

    public function MenuButton(title: String, posX: int, posY: int)
    {
        m_sTitle = title;
        XPosition = posX;
        YPosition = posY;
    }

    public function MenuButton(title: String, posX: int, posY: int, width: int, height: int)
    {
        m_sTitle = title;
        XPosition = posX;
        YPosition = posY;
        m_Width = width;
        m_Height = height;
    }

    public function MenuButton(title: String, posX: int, posY: int, width: int, height: int, onClicked: Function)
    {
        m_sTitle = title;
        XPosition = posX;
        YPosition = posY;
        m_Width = width;
        m_Height = height;
        OnClick = onClicked;
    }

    /// properties

    /**
     * @brief OnClick is used as a callback for a click event of a Button.
     */
     var m_onClick: Function;
     public function get OnClick(): Function
     {
        return m_onClick;
     }
     public function set OnClick(value: Function)
     {
        m_onClick = value;
     }

    /**
     * @brief Title property contains a Buttons title text.
     */
    var m_sTitle: String;
    public function get Title(): String
    {
        return m_sTitle;
    }
    public function set Title(value: String)
    {
        m_sTitle = value;
    }


    /**
     * @brief Button's width.
     */
    var m_Width = 100;
    public function get Width(): int
    {
        return m_Width;
    }
    public function set Width(value: int)
    {
        m_Width = value;
    }

    /**
     * @brief Button's height.
     */
    var m_Height = 50;
    public function get Height(): int
    {
        return m_Height;
    }
    public function set Height(value: int)
    {
        m_Height = value;
    }

    /// @copydoc GUIObject.drawObject
    public function drawObject()
    {
        if (GUI.Button( Rect(m_XPosition, m_YPosition , m_Width, Height), m_sTitle) )
        {
            m_onClick();
        }
    }
}