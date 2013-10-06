#pragma strict

public var menusObject: GameObject;

private var menuGUIService: GUIService;

function Start()
{
    menuGUIService = new GUIService(true);
    var mainMenu: MainMenuComponent;
    mainMenu = menusObject.AddComponent(MainMenuComponent);
    mainMenu.getMainMenu().setGUIService(menuGUIService);
}