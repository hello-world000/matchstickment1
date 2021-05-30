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
        To.statusbar.value = From.statusbar.value
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
    let p1img = img`
        ffffff...................ffff...
        fffffff.................fffff...
        ff...fff...............fff.ff...
        ff....ff...............ff..ff...
        ff....ff...................ff...
        ff....ff...................ff...
        ff....ff...................ff...
        ff...fff...................ff...
        fffffff....................ff...
        ffffff.....................ff...
        ff.........................ff...
        ff.........................ff...
        ff......................ffffffff
        ff......................ffffffff
    `
    let p2img = img`
        ffffff..................ffffffff
        fffffff.................ffffffff
        ff...fff......................ff
        ff....ff......................ff
        ff....ff......................ff
        ff....ff......................ff
        ff....ff................ffffffff
        ff...fff................ffffffff
        fffffff.................ff......
        ffffff..................ff......
        ff......................ff......
        ff......................ff......
        ff......................ffffffff
        ff......................ffffffff
    `
    let nimg = img`
        ............................................................
        ............................................................
        ............................................................
        ....9..................................................9....
        ...99..................................................99...
        ..999..................................................999..
        .9999..................................................9999.
        99999..................................................99999
        99999..................................................99999
        .9999..................................................9999.
        ..999..................................................999..
        ...99..................................................99...
        ....9..................................................9....
        ............................................................
        ............................................................
        ............................................................
    `
    let limg = img`
        ............................................................
        ............................................................
        ............................................................
        ....2..................................................9....
        ...22..................................................99...
        ..222..................................................999..
        .2222..................................................9999.
        22222..................................................99999
        22222..................................................99999
        .2222..................................................9999.
        ..222..................................................999..
        ...22..................................................99...
        ....2..................................................9....
        ............................................................
        ............................................................
        ............................................................
    `
    let rimg = img`
        ............................................................
        ............................................................
        ............................................................
        ....9..................................................2....
        ...99..................................................22...
        ..999..................................................222..
        .9999..................................................2222.
        99999..................................................22222
        99999..................................................22222
        .9999..................................................2222.
        ..999..................................................222..
        ...99..................................................22...
        ....9..................................................2....
        ............................................................
        ............................................................
        ............................................................
    `
    let dot = img`
        555..55..55..55..55..55..55..55..55..55..55..555
        5..............................................5
        5..............................................5
        ................................................
        ................................................
        5..............................................5
        5..............................................5
        ................................................
        ................................................
        5..............................................5
        5..............................................5
        ................................................
        ................................................
        5..............................................5
        5..............................................5
        5..............................................5
        5..............................................5
        5..............................................5
        5..............................................5
        ................................................
        ................................................
        5..............................................5
        5..............................................5
        ................................................
        ................................................
        5..............................................5
        5..............................................5
        ................................................
        ................................................
        5..............................................5
        5..............................................5
        555..55..55..55..55..55..55..55..55..55..55..555
    `
    let sol = img`
        222222222222222222222222222222222222222222222222
        2..............................................2
        2..............................................2
        2..............................................2
        2..............................................2
        2..............................................2
        2..............................................2
        2..............................................2
        2..............................................2
        2..............................................2
        2..............................................2
        2..............................................2
        2..............................................2
        2..............................................2
        2..............................................2
        2..............................................2
        2..............................................2
        2..............................................2
        2..............................................2
        2..............................................2
        2..............................................2
        2..............................................2
        2..............................................2
        2..............................................2
        2..............................................2
        2..............................................2
        2..............................................2
        2..............................................2
        2..............................................2
        2..............................................2
        2..............................................2
        222222222222222222222222222222222222222222222222
    `
    let c1 = sprites.create(nimg)
    let p1 = sprites.create(p1img)
    let m1 = sprites.create(p1img)
    let b1 = sprites.create(dot)
    c1.setFlag(SpriteFlag.Invisible, true)
    p1.setFlag(SpriteFlag.Invisible, true)
    m1.setFlag(SpriteFlag.Invisible, true)
    b1.setFlag(SpriteFlag.Invisible, true)
    let c2 = sprites.create(nimg)
    let p2 = sprites.create(p2img)
    let m2 = sprites.create(p2img)
    let b2 = sprites.create(dot)
    c2.setFlag(SpriteFlag.Invisible, true)
    p2.setFlag(SpriteFlag.Invisible, true)
    m2.setFlag(SpriteFlag.Invisible, true)
    b2.setFlag(SpriteFlag.Invisible, true)
    let clock1 = -1
    let clock2 = -1
    let interval = -1
    let dialog1: game.Dialog
    let dialog2: game.Dialog
    let txt1: game.Dialog
    let index1 = 0
    let index2 = 0
    function fastFill(dia: game.Dialog, index: number, x: number, y: number, w: number, h: number) {
        const color = dia.frame.getPixel(index % 3, Math.idiv(index, 3))
        dia.image.fillRect(dia.innerLeft + x, dia.innerTop + y, w, h, color)
    }
    function clearInterior(dia: game.Dialog) {
        if (dia.unit == 1)
            return fastFill(dia, 4, 1, 1, dia.columns - 2, dia.rows - 2)
        for (let d = 1; d < dia.columns - 1; d++) {
            for (let s = 1; s < dia.rows - 1; s++) {
                drawPartial(dia, 4, d, s)
            }
        }
    }
    function drawPartial(dia: game.Dialog, index: number, colTo: number, rowTo: number) {
        const x0 = dia.innerLeft + colTo * dia.unit;
        const y0 = dia.innerTop + rowTo * dia.unit;
        const xf = (index % 3) * dia.unit;
        const yf = Math.idiv(index, 3) * dia.unit;
        for (let e = 0; e < dia.unit; e++) {
            for (let t = 0; t < dia.unit; t++) {
                dia.image.setPixel(
                    x0 + e,
                    y0 + t,
                    dia.frame.getPixel(xf + e, yf + t));
            }
        }
    }
    //%block
    //%group="游戏初始化"
    //%blockId=characterMenus block="开始游戏"
    //%weight=99
    export function characterMenus(){

        scene.setBackgroundColor(1)
        c1.setPosition(30, 65)
        p1.setPosition(30, 35)
        m1.setPosition(37, 65)
        b1.setPosition(30, 60)
        c2.setPosition(130, 65)
        p2.setPosition(130, 35)
        m2.setPosition(137, 65)
        b2.setPosition(130, 60)
        c1.setFlag(SpriteFlag.Invisible, false)
        p1.setFlag(SpriteFlag.Invisible, false)
        m1.setFlag(SpriteFlag.Invisible, false)
        b1.setFlag(SpriteFlag.Invisible, false)
        c2.setFlag(SpriteFlag.Invisible, false)
        p2.setFlag(SpriteFlag.Invisible, false)
        m2.setFlag(SpriteFlag.Invisible, false)
        b2.setFlag(SpriteFlag.Invisible, false)
        
        game.pushScene()
        game.currentScene().flags |= scene.Flag.SeeThrough;
        dialog1 = new game.Dialog(60, 22);
        const s1 = sprites.create(dialog1.image, -1);
        s1.top = 75;
        s1.left = 1;
        dialog1.setText(characters[index1].name)
        dialog1.drawTextCore();
        m1.setImage(characters[index1].character.standard)

        txt1 = new game.Dialog(85, 25, img`
            . . . .
            . . . .
            . . . .
            . . . .
        `);
        const s3 = sprites.create(txt1.image, -1);
        s3.top = 95;
        s3.left = 50;
        txt1.textColor = 3
        txt1.setText("开始游戏")
        txt1.drawTextCore();

        //game.pushScene()
        //game.currentScene().flags |= scene.Flag.SeeThrough;
        dialog2 = new game.Dialog(60, 22);
        const s2 = sprites.create(dialog2.image, -1);
        s2.top = 75;
        s2.left = 99;
        dialog2.setText(characters[index2].name)
        dialog2.drawTextCore();
        m2.setImage(characters[index2].character.standard)

        animation.runImageAnimation(b1, [dot, img`.`], 1000, true)
        animation.runImageAnimation(b2, [dot, img`.`], 1000, true)

        let t = 150
        let lock = 0
        interval = setInterval(()=>{
            if(clock1 == -2 && clock2 == -2){
                if(lock == 0
                    && !controller.player1.isPressed(ControllerButton.A) 
                    && !controller.player2.isPressed(ControllerButton.A)){
                        lock = 1
                    }
                else if(lock == 1
                    && (controller.player1.isPressed(ControllerButton.A) 
                    || controller.player2.isPressed(ControllerButton.A)))
                {
                    lock = 0
                    c1.lifespan = 0
                    p1.lifespan = 0
                    m1.lifespan = 0
                    b1.lifespan = 0
                    c2.lifespan = 0
                    p2.lifespan = 0
                    m2.lifespan = 0
                    b2.lifespan = 0
                    game.popScene()
                    clearInterval(interval)
                    myGame.overlap(chooseCharacter(myGame.PlayerKind.Player1, index1), 
                                chooseCharacter(myGame.PlayerKind.Player2, index2))
                }
            }
            if(controller.player1.isPressed(ControllerButton.A) && clock1 != -2){
                clearTimeout(clock1)
                clock1 = -2
                c1.setImage(nimg)
                animation.stopAnimation(animation.AnimationTypes.All, b1)
                b1.setImage(sol)
                if(clock2 == -2){
                    lock = 0
                    clearInterior(txt1)
                    txt1.textColor = 2
                    txt1.setText("开始游戏")
                    txt1.drawTextCore();
                }
            }
            else if(controller.player1.isPressed(ControllerButton.B) && clock1 == -2){
                clock1 = -1
                animation.runImageAnimation(b1, [dot, img`.`], 1000, true)
                clearInterior(txt1)
                txt1.textColor = 3
                txt1.setText("开始游戏")
                txt1.drawTextCore();
            }
            else if(controller.player1.isPressed(ControllerButton.Left) && clock1 == -1){
                clearTimeout(clock1)
                c1.setImage(limg)
                clearInterior(dialog1)
                index1 = (index1-1+characters.length)%characters.length
                dialog1.setText(characters[index1].name)
                dialog1.drawTextCore()
                m1.setImage(characters[index1].character.standard)
                clock1 = setTimeout(()=>{
                    c1.setImage(nimg)
                    clock1 = -1
                }, t)
            }
            else if(controller.player1.isPressed(ControllerButton.Right) && clock1 == -1){
                clearTimeout(clock1)
                c1.setImage(rimg)
                clearInterior(dialog1)
                index1 = (1+index1)%characters.length
                dialog1.setText(characters[index1].name)
                dialog1.drawTextCore()
                m1.setImage(characters[index1].character.standard)
                clock1 = setTimeout(()=>{
                    c1.setImage(nimg)
                    clock1 = -1
                }, t)
            }
            if(controller.player2.isPressed(ControllerButton.A) && clock2 != -2){
                clearTimeout(clock2)
                clock2 = -2
                c2.setImage(nimg)
                animation.stopAnimation(animation.AnimationTypes.All, b2)
                b2.setImage(sol)
                if(clock1 == -2){
                    lock = 0
                    clearInterior(txt1)
                    txt1.textColor = 2
                    txt1.setText("开始游戏")
                    txt1.drawTextCore();
                }
            }
            else if(controller.player2.isPressed(ControllerButton.B) && clock2 == -2){
                clock2 = -1
                animation.runImageAnimation(b2, [dot, img`.`], 1000, true)
                clearInterior(txt1)
                txt1.textColor = 3
                txt1.setText("开始游戏")
                txt1.drawTextCore();
            }
            else if(controller.player2.isPressed(ControllerButton.Left) && clock2 == -1){
                clearTimeout(clock2)
                c2.setImage(limg)
                clearInterior(dialog2)
                index2 = (index2-1+characters.length)%characters.length
                dialog2.setText(characters[index2].name)
                dialog2.drawTextCore()
                m2.setImage(characters[index2].character.standard)
                clock2 = setTimeout(()=>{
                    c2.setImage(nimg)
                    clock2 = -1
                }, t)
            }
            else if(controller.player2.isPressed(ControllerButton.Right) && clock2 == -1){
                clearTimeout(clock2)
                c2.setImage(rimg)
                clearInterior(dialog2)
                index2 = (1+index2)%characters.length
                dialog2.setText(characters[index2].name)
                dialog2.drawTextCore()
                m2.setImage(characters[index2].character.standard)
                clock2 = setTimeout(()=>{
                    c2.setImage(nimg)
                    clock2 = -1
                }, t)
            }
        }, 10)
    }

    /*//%block
    //%group="游戏初始化"
    //%blockId=chooseCharacter block="玩家%kind 选择人物 %index"
    //%kind.defl=myGame.PlayerKind.Player1
    //%index.defl=0
    //%blockSetVariable="player"
    //%weight=98
    export */
    function chooseCharacter(kind: myGame.PlayerKind, index: number) : myGame.Character{
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
        return newPlayer
    }
    /*
    //%block
    //%group="游戏初始化"
    //%blockId=overlap block="开始游戏 %p1=variables_get(player1) %p2=variables_get(player2)"
    //%weight=90
    export function overlap(p1: myGame.Character, p2: myGame.Character){
        myGame.overlap(p1, p2)
    }
    */

}