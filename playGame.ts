// 在此处添加您的代码
namespace playGame{
    export let characters :({character: myGame.Character, name: string})[] = []

    //%block
    //%group="游戏初始化"
    //%blockId=createCharacter block="玩家%kind=kind 选择人物 %index"
    //%kind.defl=myGame.PlayerKind.Player1
    //%index.defl=0
    //%blockSetVariable="player"
    //%weight=98
    export function createCharacter(kind: myGame.PlayerKind, index: number) : myGame.Character{
        return characters[index].character
    }

    //%block
    //%group="游戏初始化"
    //%blockId=setPlayer block="设置人物 %p=variables_get(player) 归属玩家 %kind=kind"
    //%kind.defl=myGame.PlayerKind.Player1
    //%weight=97
    export function setPlayer(p: myGame.Character, kind: myGame.PlayerKind){
        myGame.setPlayer(p, kind)
    }

    //%block
    //%group="游戏初始化"
    //%blockId=overlap block="开始游戏 %p1=variables_get(player1) %p2=variables_get(player2)"
    //%weight=90
    export function overlap(p1: myGame.Character, p2: myGame.Character){
        myGame.overlap(p1, p2)
    }

}