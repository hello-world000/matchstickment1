namespace playGame{
    export let characters :({character: myGame.Character, name: string})[]
    function copy(From: myGame.Character, To: myGame.Character){
        To.damageA = From.damageA
        To.damageB = From.damageB
        To.def = From.def
        To.defact = From.defact    
        To.defencelas = From.defencelas    
        To.downtime = From.downtime    
        To.hitrecA = From.hitrecA   
        To.hitrecB = From.hitrecB    
        To.immutime = From.immutime    
        To.jumpspeed = From.jumpspeed    
        To.rushspeed = From.rushspeed    
        To.walkspeed = From.walkspeed
        To.attackA = From.attackA
        To.hand = From.hand
        To.rushA = From.rushA
        To.rushhand = From.rushhand
        To.attackB = From.attackB
        To.leg = From.leg 
        To.rushB = From.rushB
        To.rushleg = From.rushleg
        To.defenceimg = From.defenceimg
        To.hitover = From.hitover
        To.lieimg = From.lieimg
        To.standard = From.standard
        To.hurtedimg = From.hurtedimg
        To.walkimg = From.walkimg
        To.walkInterval = From.walkInterval
        To.skill0A = From.skill0A
        To.skill1A = From.skill1A
        To.skill2A = From.skill2A
        To.skill3A = From.skill3A
        To.skill4A = From.skill4A
        To.skill6A = From.skill6A
        To.skill8A = From.skill8A
        To.skill9A = From.skill9A
        To.skill10A = From.skill10A
        To.skill0B = From.skill0B
        To.skill1B = From.skill1B
        To.skill2B = From.skill2B
        To.skill3B = From.skill3B
        To.skill4B = From.skill4B
        To.skill6B = From.skill6B
        To.skill8B = From.skill8B
        To.skill9B = From.skill9B
        To.skill10B = From.skill10B
    }

    //%block
    //%group="游戏初始化"
    //%blockId=chooseCharacter block="玩家%kind 选择人物 %index"
    //%kind.defl=myGame.PlayerKind.Player1
    //%index.defl=0
    //%blockSetVariable="player"
    //%weight=98
    export function chooseCharacter(kind: myGame.PlayerKind, index: number) : myGame.Character{
        if(characters == null || index >= characters.length){
            return null
        }
        let newPlayer = new myGame.Character(sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
        `), controller.player1, SpriteKind.p1atk)
        copy(characters[index].character, newPlayer)
        myGame.setPlayer(newPlayer, kind)
        //myGame.setPlayer(characters[index].character, kind)
        return newPlayer
    }

    //%block
    //%group="游戏初始化"
    //%blockId=overlap block="开始游戏 %p1=variables_get(player1) %p2=variables_get(player2)"
    //%weight=90
    export function overlap(p1: myGame.Character, p2: myGame.Character){
        myGame.overlap(p1, p2)
    }

}