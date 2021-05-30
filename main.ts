namespace test1{
    function coin () {
        if (Math.percentChance(50)) {
            return 1
        } else {
            return -1
        }
    }
    let mySprite3: Sprite = null
    let ty = 0
    let action11: myGame.action = null
    let projectile3: myGame.wave = null
    let action10: myGame.action = null
    let projectile2: myGame.wave = null
    let angel = 0
    let y = 0
    let x = 0
    let projectile: myGame.wave = null
    let time = 0
    let mySprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f . . . . . . . 
        . . . . . f . . . f . . . . . . 
        . . . . . f . . . f . . . . . . 
        . . . . . f . . . f . . . . . . 
        . . . . . . f f f . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . f f . f . f f . . . . . 
        . . . f f . . f . . f f . . . . 
        . . . f . . . f . . . f . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . f f . . . f f . . . . . 
        . . . . f . . . . . f . . . . . 
        `, SpriteKind.Player)
    let mySprite2 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f . . . . . . . 
        . . . . . f . . . f . . . . . . 
        . . . . . f . . . f . . . . . . 
        . . . . . f . . . f . . . . . . 
        . . . . . . f f f . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . f f . f . f f . . . . . 
        . . . f f . . f . . f f . . . . 
        . . . f . . . f . . . f . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . f f . . . f f . . . . . 
        . . . . f . . . . . f . . . . . 
        `, SpriteKind.Player)
    let player1 = myGame.createCharacter(mySprite, myGame.PlayerKind.Player1)
    let player2 = myGame.createCharacter(mySprite2, myGame.PlayerKind.Player2)
    myGame.setWalkImage(player1, myGame.aniKind.Walk, [img`
        ................
        ................
        ................
        ................
        ................
        ................
        ......fff.......
        .....f...f......
        .....f...f......
        .....f...f......
        ......fff.......
        .......f........
        .......ffffff...
        .......f........
        .......f........
        .......f........
        .......f........
        .....fffff......
        ....ff...ff.....
        ....f.....f.....
        `,img`
        ................
        ................
        ................
        ................
        ................
        ......fff.......
        .....f...f......
        .....f...f......
        .....f...f......
        ......fff.......
        .......f........
        .......ffffff...
        .......f........
        .......f........
        .......f........
        .......f........
        .....fffff......
        ....ff...ff.....
        ....f.....f.....
        ................
        `,img`
        ................
        ................
        ................
        ................
        ......fff.......
        .....f...f......
        .....f...f......
        .....f...f......
        ......fff.......
        .......f........
        .......ffffff...
        .......f........
        .......f........
        .......f........
        .......f........
        .....fffff......
        ....ff...ff.....
        ....f.....f.....
        ................
        ................
        `,img`
        ................
        ................
        ................
        ......fff.......
        .....f...f......
        .....f...f......
        .....f...f......
        ......fff.......
        .......f........
        .......ffffff...
        .......f........
        .......f........
        .......f........
        .......f........
        .....fffff......
        ....ff...ff.....
        ....f.....f.....
        ................
        ................
        ................
        `,img`
        ................
        ......fff.......
        .....f...f......
        .....f...f......
        .....f...f......
        ......fff.......
        .......f........
        .......ffffff...
        .......f........
        .......f........
        .......f........
        .......f........
        .....fffff......
        ....ff...ff.....
        ....f.....f.....
        ................
        ................
        ................
        ................
        ................
        `,img`
        ................
        ................
        ................
        ......fff.......
        .....f...f......
        .....f...f......
        .....f...f......
        ......fff.......
        .......f........
        .......ffffff...
        .......f........
        .......f........
        .......f........
        .......f........
        .....fffff......
        ....ff...ff.....
        ....f.....f.....
        ................
        ................
        ................
        `,img`
        ................
        ................
        ................
        ................
        ......fff.......
        .....f...f......
        .....f...f......
        .....f...f......
        ......fff.......
        .......f........
        .......ffffff...
        .......f........
        .......f........
        .......f........
        .......f........
        .....fffff......
        ....ff...ff.....
        ....f.....f.....
        ................
        ................
        `,img`
        ................
        ................
        ................
        ................
        ................
        ......fff.......
        .....f...f......
        .....f...f......
        .....f...f......
        ......fff.......
        .......f........
        .......ffffff...
        .......f........
        .......f........
        .......f........
        .......f........
        .....fffff......
        ....ff...ff.....
        ....f.....f.....
        ................
        `,img`
        ................
        ................
        ................
        ................
        ................
        ................
        ......fff.......
        .....f...f......
        .....f...f......
        .....f...f......
        ......fff.......
        .......f........
        .......ffffff...
        .......f........
        .......f........
        .......f........
        .......f........
        .....fffff......
        ....ff...ff.....
        ....f.....f.....
        `], 40)
    myGame.setStImage(player1, myGame.stimgKind.Defence, img`
        . . . . . . 5 4 5 5 . . . . . . 
        . . 5 4 5 5 4 . . . 5 4 5 . . . 
        . 5 4 . . . f f f . . 4 4 5 . . 
        . 4 5 . . f . . . f . . 4 4 . . 
        . 5 4 . . f . . . f . . 5 4 . . 
        5 5 4 . . f . . . f . . . 5 . . 
        5 4 . . . . f f f . . . . 5 5 . 
        5 4 . . . . . f . . . . . 5 4 . 
        4 . . . . f f f f f . . . 4 . . 
        5 5 . . f f . f . f f . 5 4 5 . 
        . 5 . f f . . f . . f f . . 5 . 
        . 4 5 f . . . f . . . f . . 5 . 
        . 5 4 . . . . f . . . . . 4 5 . 
        . 5 4 . . f f f f f . . . 5 4 . 
        . 4 5 . f f . . . f f . . 5 4 5 
        . 5 . . f . . . . . f . . 4 5 5 
        `)
    myGame.setStImage(player1, myGame.stimgKind.Stand, img`
        . . . . . . . . . . . . . . . . 
        . . . . . . 7 7 7 . . . . . . . 
        . . . . . . 7 7 7 . . . . . . . 
        . . . . . f . . . f . . . . . . 
        . . . . . f . . . f . . . . . . 
        . . . . . f . . . f . . . . . . 
        . . . . . . f f f . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . f f . f . f f . . . . . 
        . . . f f . . f . . f f . . . . 
        . . . f . . . f . . . f . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . f f . . . f f . . . . . 
        . . . . f . . . . . f . . . . . 
        `)
    myGame.defalutSkill(player1)
    myGame.defalutSkill(player2)
    myGame.setAbility(player2, myGame.abilityKind.def, 0.1)
    let action = myGame.createAction()
    let action2 = myGame.createAction()
    let action3 = myGame.createAction()
    let action4 = myGame.createAction()
    let action5 = myGame.createAction()
    let action6 = myGame.createAction()
    let action7 = myGame.createAction()
    let action8 = myGame.createAction()
    let action9 = myGame.createAction()
    myGame.exportCharacter(player1, "test1")
    myGame.exportCharacter(player2, "test2")
    myGame.setSkill(player2, myGame.SkillKind.B1, function (player3) {
        x = player3.x
        y = player3.y
        myGame.jump(player3)
        player3.enemy.vy = -80
        player3.sprite.setPosition(player3.enemy.x, player3.enemy.y)
        player3.enemy.setPosition(x, y)
        myGame.actionDelay(1.2, action6, player3, projectile)
    })
    myGame.setSkill(player1, myGame.SkillKind.A2, function (player3) {
        angel = 0
        time = 0.5
        for (let index2 = 0; index2 <= 9; index2++) {
            myGame.atkAction(player3, myGame.atkKind.RushAtkA)
            projectile = myGame.shoot2(player3, img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . 2 2 . . . . . . . 
                . . . . . . 2 1 1 2 . . . . . . 
                . . . . . . a 1 1 a . . . . . . 
                . . . . . . . a a . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, player3.x, player3.y, angel)
            myGame.setBullet(projectile, myGame.bulletP.damage, 2)
            myGame.setBullet2(projectile, myGame.bulletP2.breakdef, true)
            angel += 20
            myGame.actionDelay(time, action, player3, projectile)
    time += 0.1
        }
    })
    myGame.setAction(action8, function (player3, projectile) {
        angel = 100
        time = 1
        for (let index = 0; index < 3; index++) {
            projectile2 = myGame.shoot2(player3, img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . 8 8 . . . . . . . 
                . . . . . . 9 1 1 9 . . . . . . 
                . . . . . 8 1 1 1 1 8 . . . . . 
                . . . . . 8 1 1 1 1 8 . . . . . 
                . . . . . . 9 1 1 9 . . . . . . 
                . . . . . . . 8 8 . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, player3.x, player3.y, angel, 120)
            myGame.acceToV(projectile2, time, 30, 30)
            action10 = myGame.actionThen(myGame.actionThen(myGame.actionThen(myGame.actionThen(myGame.actionDelay(time, action9, player3, projectile2), 1, myGame.actionThen(myGame.actionThen(myGame.actionThen(myGame.actionThen(myGame.actionDelay(time, action9, player3, projectile2), 1, action3, player3, projectile2), time, action9, player3, projectile2), 1, action3, player3, projectile2), time, action9, player3, projectile2), player3, projectile2), time, action9, player3, projectile2), 1, action3, player3, projectile2), time, action9, player3, projectile2)
            angel += 60 / 4
            time += 0.5
        }
    })
    myGame.setAction(action4, function (player3, projectile) {
        time = 0.5
        for (let index3 = 0; index3 <= 2; index3++) {
            myGame.actionDelay(time, action5, player3, projectile)
    time += 0.2
        }
    })
    myGame.setAction(action2, function (player3, projectile) {
        angel = 90
        time = 0.6
        for (let index32 = 0; index32 <= 6; index32++) {
            myGame.atkAction(player3, myGame.atkKind.RushAtkB)
            projectile = myGame.shoot2(player3, img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . 5 5 . . . . . . . 
                . . . . . . 5 1 1 5 . . . . . . 
                . . . . . . 4 1 1 4 . . . . . . 
                . . . . . . . 4 4 . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, player3.x, player3.y, angel, 80)
            myGame.setBullet(projectile, myGame.bulletP.damage, 3)
            projectile.lifespan = time * 1100
            myGame.actionRept(2, 0.5, action3, player3, projectile)
            angel += 90 / 6
            time += 0.2
        }
    })
    myGame.setSkill(player1, myGame.SkillKind.B1, function (player3) {
        myGame.counterAttack(player3, action2, projectile)
    })
    myGame.setSkill(player2, myGame.SkillKind.B10, function (player3) {
        myGame.atkAction(player3, myGame.atkKind.BasicAtkA)
        myGame.actionDelay(0, action4, player3, projectile)
    myGame.autoAttack(player3, 0.8, action4, projectile)
    })
    myGame.setSkill(player1, myGame.SkillKind.B8, function (player3) {
        myGame.run(player3)
        projectile3 = myGame.newPosture(player3, img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . f f f . 
            . . . . . . . . . . . f . . . f 
            . . . . . . . . f f f f . . . f 
            . . . . . . . f f . . f . . . f 
            . . . . . f f f . . . . f f f . 
            . . . . f f . f . . . . . . . . 
            . . . f f . f f . . . . . . . . 
            . . . f . . f . . . . . . . . . 
            . . . . . . f . . . . . . . . . 
            . . . . f f f f . . . . . . . . 
            . . . f f . . f f . . . . . . . 
            . . . f . . . . f f . . . . . . 
            `, 0.3, img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . 2 2 2 . 
            . . . . . . . . . . . 2 . . . 2 
            . . . . . . . . . . 2 2 . . . 2 
            . . . . . . . . . . . 2 . . . 2 
            . . . . . . . . . . . . 2 2 2 . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        myGame.setBullet2(projectile3, myGame.bulletP2.breakdef, true)
        myGame.setBullet(projectile3, myGame.bulletP.damage, 10)
        myGame.setBullet(projectile3, myGame.bulletP.hurted, 4)
        action11 = myGame.actionDelay(0, action8, player3, projectile)
    })
    myGame.setAction(action5, function (player3, projectile) {
        projectile = myGame.shoot2(player3, img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . c . . . . . . . . 
            . . . . c a a a c . . . . . . . 
            . . . c c f a b b c . . . . . . 
            . . . b f f b f a a . . . . . . 
            . . . b b a b f f a . . . . . . 
            . . . c b f b b a c . . . . . . 
            . . . . b a f c c . . . . . . . 
            . . . . . b b c . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, player3.x, player3.y + randint(-5, 5), 180)
        ty = projectile.y
        myGame.setBullet(projectile, myGame.bulletP.damage, 1)
        myGame.actionRept(5, 0.5, action7, player3, projectile)
    })
    myGame.setAction(action6, function (player3, projectile) {
        projectile = myGame.shoot2(player3, img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 4 4 4 4 4 . . . . . . 
            . . . 4 4 4 5 5 5 d 4 4 4 4 . . 
            . . 4 d 5 d 5 5 5 d d d 4 4 . . 
            . . 4 5 5 1 1 1 d d 5 5 5 4 . . 
            . 4 5 5 5 1 1 1 5 1 1 5 5 4 4 . 
            . 4 d d 1 1 5 5 5 1 1 5 5 d 4 . 
            . 4 5 5 1 1 5 1 1 5 5 d d d 4 . 
            . 2 5 5 5 d 1 1 1 5 1 1 5 5 2 . 
            . 2 d 5 5 d 1 1 1 5 1 1 5 5 2 . 
            . . 2 4 d d 5 5 5 5 d d 5 4 . . 
            . . . 2 2 4 d 5 5 d d 4 4 . . . 
            . . 2 2 2 2 2 4 4 4 2 2 2 . . . 
            . . . 2 2 4 4 4 4 4 4 2 2 . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            `, x, y, 0, 0)
        projectile.lifespan = 600
        myGame.setBullet(projectile, myGame.bulletP.damage, 10)
        myGame.setBullet2(projectile, myGame.bulletP2.breakdef, true)
        myGame.setBullet2(projectile, myGame.bulletP2.indeflectible, true)
        mySprite3 = sprites.createProjectileFromSprite(img`
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
            `, projectile, 0, 0)
        mySprite3.lifespan = 600
        animation.runImageAnimation(
        mySprite3,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 4 4 4 4 4 . . . . . . 
            . . . 4 4 4 5 5 5 d 4 4 4 4 . . 
            . . 4 d 5 d 5 5 5 d d d 4 4 . . 
            . . 4 5 5 1 1 1 d d 5 5 5 4 . . 
            . 4 5 5 5 1 1 1 5 1 1 5 5 4 4 . 
            . 4 d d 1 1 5 5 5 1 1 5 5 d 4 . 
            . 4 5 5 1 1 5 1 1 5 5 d d d 4 . 
            . 2 5 5 5 d 1 1 1 5 1 1 5 5 2 . 
            . 2 d 5 5 d 1 1 1 5 1 1 5 5 2 . 
            . . 2 4 d d 5 5 5 5 d d 5 4 . . 
            . . . 2 2 4 d 5 5 d d 4 4 . . . 
            . . 2 2 2 2 2 4 4 4 2 2 2 . . . 
            . . . 2 2 4 4 4 4 4 4 2 2 . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            `,img`
            . . . . 2 2 2 2 2 2 2 2 . . . . 
            . . . 2 4 4 4 5 5 4 4 4 2 2 2 . 
            . 2 2 5 5 d 4 5 5 5 4 4 4 4 2 . 
            . 2 4 5 5 5 5 d 5 5 5 4 5 4 2 2 
            . 2 4 d d 5 5 5 5 5 5 d 4 4 4 2 
            2 4 5 5 d 5 5 5 d d d 5 5 5 4 4 
            2 4 5 5 4 4 4 d 5 5 d 5 5 5 4 4 
            4 4 4 4 . . 2 4 5 5 . . 4 4 4 4 
            . . b b b b 2 4 4 2 b b b b . . 
            . b d d d d 2 4 4 2 d d d d b . 
            b d d b b b 2 4 4 2 b b b d d b 
            b d d b b b b b b b b b b d d b 
            b b d 1 1 3 1 1 d 1 d 1 1 d b b 
            . . b b d d 1 1 3 d d 1 b b . . 
            . . 2 2 4 4 4 4 4 4 4 4 2 2 . . 
            . . . 2 2 4 4 4 4 4 2 2 2 . . . 
            `,img`
            . . . . . . . . b b . . . . . . 
            . . . . . . . . b b . . . . . . 
            . . . b b b . . . . . . . . . . 
            . . b d d b . . . . . . . b b . 
            . b d d d b . . . . . . b d d b 
            . b d d b . . . . b b . b d d b 
            . b b b . . . . . b b . . b b . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . b b b d d d d d d b b b . . 
            . b d c c c b b b b c c d d b . 
            b d d c b . . . . . b c c d d b 
            c d d b b . . . . . . b c d d c 
            c b d d d b b . . . . b d d c c 
            . c c b d d d d b . c c c c c c 
            . . . c c c c c c . . . . . . . 
            `],
        200,
        false
        )
    })
    myGame.setAction(action3, function (player3, projectile) {
        angel = 0
        for (let index4 = 0; index4 <= 3; index4++) {
            if (!(myGame.isDestroyed(projectile))) {
                projectile = myGame.shoot2(player3, img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . 5 5 . . . . . . . 
                    . . . . . . 5 1 1 5 . . . . . . 
                    . . . . . . 4 1 1 4 . . . . . . 
                    . . . . . . . 4 4 . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, projectile.x, projectile.y, angel)
                myGame.setBullet(projectile, myGame.bulletP.damage, 1)
                angel += 120
            }
        }
    })
    myGame.setAction(action, function (player3, projectile) {
        myGame.aimedshot(player3, projectile)
    })
    myGame.setAction(action7, function (player3, projectile) {
        if (projectile.vy < 0) {
            myGame.movexy(projectile, 0.5, 0, 5)
        } else if (projectile.vy > 0) {
            myGame.movexy(projectile, 0.5, 0, -5)
        } else {
            myGame.movexy(projectile, 0.5, 0, 5 * coin())
        }
    })
    myGame.setAction(action9, function (player3, projectile) {
        myGame.aimedshot(player3, projectile)
    })
    // let playerA = playGame.chooseCharacter(myGame.PlayerKind.Player1, 0)
    // let playerB = playGame.chooseCharacter(myGame.PlayerKind.Player2, 0)
    // myGame.overlap(playerA, playerB)
}
