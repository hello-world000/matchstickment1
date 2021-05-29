// 在此处添加您的代码
namespace playGame{
    export let characters :({character: myGame.Character, name: string})[]

    //%block
    //%group="游戏初始化"
    //%blockId=chooseCharacter block="玩家%kind=kind 选择人物 %index"
    //%kind.defl=myGame.PlayerKind.Player1
    //%index.defl=0
    //%blockSetVariable="player"
    //%weight=98
    export function chooseCharacter(kind: myGame.PlayerKind, index: number) : myGame.Character{
        myGame.setPlayer(characters[index].character, kind)
        return characters[index].character
    }

    //%block
    //%group="游戏初始化"
    //%blockId=overlap block="开始游戏 %p1=variables_get(player1) %p2=variables_get(player2)"
    //%weight=90
    //%afterOnStart=true
    export function overlap(p1: myGame.Character, p2: myGame.Character){
        myGame.overlap(p1, p2)
    }

}