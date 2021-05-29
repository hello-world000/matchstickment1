namespace SpriteKind {
    export const p1atk = SpriteKind.create()
    export const p2atk = SpriteKind.create()
    export const p1body = SpriteKind.create()
    export const p2body = SpriteKind.create()
}
namespace myGame{
    export let g = 200
    export enum PlayerKind{
        Player1,
        Player2
    }
    export enum SkillKind{
        //% block="A"
        A,
        //% block="⬇️+A"
        A1,
        //% block="↑+A"
        A2,
        //% block="⬇️+↑+A"
        A3,
        //% block="→→+A"
        A4,
        //% block="→→+↑+A"
        A6,
        //% block="➡️+A"
        A8,
        //% block="⬇️+➡️+A"
        A9,
        //% block="⬇️+→+A"
        A10,
        //% block="B"
        B,
        //% block="⬇️+B"
        B1,
        //% block="↑+B"
        B2,
        //% block="⬇️+↑+B"
        B3,
        //% block="→→+B"
        B4,
        //% block="→→+↑+B"
        B6,
        //% block="➡️+B"
        B8,
        //% block="⬇️+➡️+B"
        B9,
        //% block="⬇️+→+B"
        B10,
    }

    export enum atkKind{
        //% block="击拳1"
        BasicAtkA,
        //% block="击拳2"
        RushAtkA,
        //% block="踢腿1"
        BasicAtkB,
        //% block="踢腿2"
        RushAtkB
    }

    export enum stimgKind{
        //% block="防御"
        Defence,
        //% block="击飞"
        Hitover,
        //% block="倒地"
        Lie
    }

    export enum bulletP{
        //% block="伤害"
        damage,
        //% block="攻击轻重"
        hurted,
        //% block="硬直"
        hitrec,
        //% block="击飞vx"
        xspeed,
        //% block="击飞vy"
        yspeed
    }

    export enum bulletP2{
        //% block="破防"
        breakdef,
        //% block="反射"
        rebound,
        //% block="不受反射"
        indeflectible
    }

    export enum abilityKind{
        //% block="奔跑速度"
        rushspeed,
        //% block="起跳速度"
        jumpspeed,
        //% block="行走速度"
        walkspeed,
        //% block="A攻击伤害"
        damageA, 
        //% block="A攻击硬直"
        hitrecA, 
        //% block="B攻击伤害"
        damageB, 
        //% block="B攻击硬直"
        hitrecB, 
        //% block="防御持续时间"
        defencelas,
        //% block="最长反击反应时间"
        defact,
        //% block="防御减伤系数"
        def,
        //% block="倒地时间"
        downtime,
        //% block="起身无敌时间"
        immutime
    }
    export enum atkimgKind{
        //% block="击拳1"
        hand1,
        //% block="击拳2"
        hand2,
        //% block="踢腿1"
        leg1,
        //% block="踢腿2"
        leg2
    }

    export enum aniKind{
        //% block="受伤动作"
        Hurt,
        //% block="走路动画"
        Walk
    }

    sprites.onOverlap(SpriteKind.p2atk, SpriteKind.p1atk, function (sprite, otherSprite) {
        if((<wave>sprite).indeflectible == false 
            && (<wave>sprite).rebound == false && (<wave>otherSprite).rebound == true){
            sprite.setKind(SpriteKind.p1atk)
            sprite.image.flipX()
            sprite.image.flipY()
            sprite.setVelocity(-sprite.vx, -sprite.vy)
        }
        else if((<wave>otherSprite).indeflectible == false
            && (<wave>otherSprite).rebound == false && (<wave>sprite).rebound == true){
            otherSprite.setKind(SpriteKind.p2atk)
            otherSprite.image.flipX()
            otherSprite.image.flipY()
            otherSprite.setVelocity(-otherSprite.vx, -otherSprite.vy)
        }
        else{
            sprite.destroy();
            otherSprite.destroy();
        }
    })

//=================== 游戏初始化 ===================
    //%block
    //%group="游戏初始化"
    //%blockId=createCharacter block="新建人物 精灵%mySprite=variables_get(mySprite) of %kind=kind"
    //%kind.defl=PlayerKind.Player1
    //%weight=99
    export function createCharacter(mySprite: Sprite, kind: PlayerKind) : Character{
        mySprite.setStayInScreen(true)
        mySprite.ay = g
        let p: Character
        if(kind == PlayerKind.Player1){
            mySprite.x = 5
            mySprite.setKind(SpriteKind.p1body)
            p = new Character(mySprite, controller.player1, SpriteKind.p1atk)
        }
        else{
            mySprite.x = 155
            mySprite.setKind(SpriteKind.p2body)
            p = new Character(mySprite, controller.player2, SpriteKind.p2atk)
        }
        return p
    }

    //%block
    //%group="游戏初始化"
    //%blockId=createCharacter2 block="新建人物 精灵%mySprite=variables_get(mySprite) of %kind=kind"
    //%kind.defl=PlayerKind.Player1
    //%blockSetVariable="player"
    //%weight=98
    export function createCharacter2(mySprite: Sprite, kind: PlayerKind) : Character{
        return createCharacter(mySprite, kind)
    }

    //%block
    //%group="游戏初始化"
    //%blockId=setPlayer block="设置人物 %p=variables_get(player) 归属玩家 %kind=kind"
    //%kind.defl=PlayerKind.Player1
    //%weight=97
    export function setPlayer(p: Character, kind: PlayerKind){
        if(kind == PlayerKind.Player1){
            p.mySprite.x = 5
            p.mySprite.setKind(SpriteKind.p1body)
            p.bulletkind = SpriteKind.p1atk
            p.statusbar.setOffsetPadding(-53, 0)
            p.laspres = 2
        }
        else{
            p.mySprite.x = 155
            p.mySprite.setKind(SpriteKind.p2body)
            p.bulletkind = SpriteKind.p2atk
            p.statusbar.setOffsetPadding(53, 0)
            p.laspres = 1
        }
    }

    //%block
    //%group="游戏初始化"
    //%blockId=overlap block="开始游戏 %p1=variables_get(player1) %p2=variables_get(player2)"
    //%weight=90
    export function overlap(p1: Character, p2: Character){
        scene.setBackgroundColor(1)
        p1.startcontroll()
        p2.startcontroll()
        p1.setEnemy(p2.mySprite)
        p2.setEnemy(p1.mySprite)
        p1.mySprite.ay = p2.mySprite.ay = g
        sprites.onOverlap(SpriteKind.p1atk, SpriteKind.p2body, function (sprite, otherSprite) {
            p2.overlap(sprite, otherSprite)
        })
        sprites.onOverlap(SpriteKind.p2atk, SpriteKind.p1body, function (sprite, otherSprite) {
            p1.overlap(sprite, otherSprite)
        })
    }

//=================== 自定义技能效果 ===================
    export class callback{
        a: action
        p: Character
        b: wave
        t: number
        constructor(a: action,p: Character,b: wave,t: number){
            this.a=a
            this.p=p
            this.b=b
            this.t=t
        }
    }
    export class action{
        act : (p: Character, b: wave)=>void
        next : callback[]
        finished: number
        id = randint(0, 100000)

        constructor(){
            this.next = []
            this.finished = 0
        }
    }

    //%block
    //%group="技能效果"
    //%blockId=creatAction block="新动作"
    //%weight=99
    //%blockSetVariable=action
    export function createAction() : action {
        return new action
    }

    //%block
    //%group="技能效果"
    //%afterOnStart=true
    //%blockId=setAction block="设置动作 %action=variables_get(action) 的效果"
    //%weight=98
    //%draggableParameters="player projectile"
    export function setAction(act: action, func: (player: Character, projectile: wave)=>void){
        act.act = func
    }
    
    //%block
    //%group="技能效果"
    //%afterOnStart=true
    //%blockId=actionDelay block="%time 秒后执行 %action=variables_get(action) %p=variables_get(player) %b=variables_get(projectile)"
    //%inlineInputMode=inline
    //%blockSetVariable="执行动作"
    //%weight=96
    export function actionDelay(time: number, act: action, p: Character, b: wave): myGame.action{
        let ret = new action
        setTimeout(()=>{
            act.act(p, b)
            ret.finished = 1
            for (let f of ret.next) {
                actionDelay(f.t, f.a, f.p, f.b)
            }
            for (let f of act.next) {
                actionDelay(f.t, f.a, f.p, f.b)
            }
        }, time*1000)
        return ret
    }

    //%block
    //%group="技能效果"
    //%afterOnStart=true
    //%blockId=actionThen block="前一动作%preAction=variables_get(action) 完成后 %time 秒后执行 %nextAction=variables_get(action) %p=variables_get(player) %b=variables_get(projectile)"
    //%inlineInputMode=inline
    //%blockSetVariable="执行动作"
    //%weight=96
    export function actionThen(preAction: action, time: number, nextAction: action, 
        p: Character, b: wave): action{
        if(preAction.finished == 1){
            actionDelay(time, nextAction, p, b)
            return nextAction
        }
        else{
            let ret = new action
            ret.act = nextAction.act
            ret.next = [].concat(nextAction.next)
            preAction.next.push(new callback(ret, p, b, time))
            return ret
        }
    }

    //%block
    //%group="技能效果"
    //%afterOnStart=true
    //%blockId=actionRepeat block="%las 秒内每隔%time 秒执行 %action=variables_get(action) %p=variables_get(player) %b=variables_get(projectile)"
    //%inlineInputMode=inline
    //%clock=-1
    //%weight=95
    export function actionRept(las: number, time: number, act: action, p: Character, b: wave) {
        let clock = setInterval(()=>{
            act.act(p, b)
        }
        , time*1000)
        setTimeout(()=>{
            clearInterval(clock)
        }, las*1000)
    }

    export class wave extends Sprite{
        damage = 1 //伤害
        hurted = 1 //攻击轻重,越大越容易击倒
        hitrec = 100 //被攻击方硬直时间
        breakdef = false //是否破防
        xspeed = 50 //击飞时的x轴速度
        yspeed = 20 //击飞时的y轴速度
        rebound = false //反射敌方子弹
        indeflectible = false //不受反射
        isDestroyed = false //已消亡
    }

    //%block
    //% group="技能设置"
    //%blockId=isDestroyed block="%b=variables_get(projectile) 已销毁"
    export function isDestroyed(b: wave): boolean{
        return b.isDestroyed
    }
    sprites.onDestroyed(SpriteKind.p1atk, function(sprite: Sprite) {
        (<wave>sprite).isDestroyed = true
    })
    sprites.onDestroyed(SpriteKind.p2atk, function(sprite: Sprite) {
        (<wave>sprite).isDestroyed = true
    })
    function reset(bullet: wave, damage = 1, hitrec = 100, hurted = 1, 
    breakdef = false, xspeed = 50, yspeed = 20, rebound = false, indeflectible = false){
        bullet.damage = damage //伤害
        bullet.hitrec = hitrec //被攻击方硬直时间
        bullet.hurted = hurted //攻击轻重,越大越容易击倒
        bullet.breakdef = breakdef //是否破防
        bullet.xspeed = xspeed //击飞时的x轴速度
        bullet.yspeed = yspeed //击飞时的y轴速度
        bullet.rebound = rebound //反射敌方子弹
        bullet.indeflectible = indeflectible //不受反射
        bullet.isDestroyed = false //已消亡
    }
    export class Character{
        laspres = -1 //方向
        rushspeed = 80 //奔跑速度
        jumpspeed = 100 //起跳速度
        walkspeed = 40 //行走速度
        rightDOWN = 0 //右走中
        leftDOWN = 0 //左走中
        defence = 0 //防御中
        skill = 0 //技能状态
        damageA = 2 //A伤害
        hitrecA = 200
        damageB = 4 //B伤害
        hitrecB = 300
        defencelas = 100 //按一下防御的持续时间
        defact = 300 //反击的最长反应时间
        def = 0.5 //防御减伤系数
        downtime = 1500 //被击倒躺地上的时间
        immutime = 1500 //起身后的无敌时间
        rush = 0 //奔跑中
        jump = 0 //跳跃中
        combo = 0 //连击中
        attack = 0 //攻击中
        hurted = 0 //受攻击硬直中
        immu = 0 //无敌中
        enemySprite: Sprite = null
        setEnemy(other: Sprite){
            this.enemySprite = other
        }
        comboclock = -1 //连击倒计时
        defclock = -1 //反击倒计时
        hurtclock = -1 //硬直恢复倒计时
        attackclock = -1 //自动攻击
        hitclock = -1 //被连续击打的最长间隔计时
        hitclock2 = -1 //被连续击打的最短间隔计时
        jumpclock = -1 //起跳落地
        standard = img`
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
        `
        defenceimg = img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f . . . f . f . . . . 
            . . . . . . f f f . . f . . . . 
            . . . . . . . f . f . f . . . . 
            . . . . . . . f f f f f . . . . 
            . . . . . . . f . f . . . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . f f f f f . . . . . . 
            . . . . f f . . . f f . . . . . 
            . . . . f . . . . . f . . . . . 
            `
        hitover = img`
            . f f f . . . f f f f . . . . .
            f . . . f . f f . . f f . . . .
            f . . . f f f . . . . f f . . .
            f . . . f . f f . . . f f f . .
            . f f f . . . f f . . f . f f .
            . . . . . . . . f f . f f . f f
        `
        lieimg = img`
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
            . f f f . . . . . . . . . . . . 
            f . . . f . . . . . . . . . . . 
            f . . . f f f f . . . . . . . . 
            f . . . f . . f f f . . . . . . 
            . f f f . . . . . f f f f f f f 
            `
        attackA = img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . f f f . . . . . . .
            . . . . . f . . . f . . . . . .
            . . . . . f . . . f . . . . . .
            . . . . . f . . . f . . . . . .
            . . . . . . f f f . . . . . . .
            . . . . . . . f . . . . . . . .
            . . . . . f f f f f f f f f f .
            . . . . f f . f . . . . . . . .
            . . . f f . . f . . . . . . . .
            . . . f . . . f . . . . . . . .
            . . . . . . . f . . . . . . . .
            . . . . . f f f f f . . . . . .
            . . . . f f . . . f f . . . . .
            . . . . f . . . . . f . . . . .
        `
        attackB = img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . f f f . . . . . . . . 
                    . . . . f . . . f . . . . . . . 
                    . . . . f . . . f . . . . . . . 
                    . . . . f . . . f . . . . . . . 
                    . . . . . f f f . . . . . . . f 
                    . . . . . . f . . . . . . . f f 
                    . . . . . . f . . . . . . f f . 
                    . . . . f f f f f f . . f f . . 
                    . . . f f . . f . . . f f . . . 
                    . . . f . . . f . . f f . . . . 
                    . . . . . . . . f f f . . . . . 
                    . . . . . . f f f . . . . . . . 
                    . . . . . f f . . . . . . . . . 
                    . . . . . f . . . . . . . . . . 
                    `
        rushA = img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . f f f . . . . . 
                    . . . . . . . f . . . f . . . . 
                    . . . . . . . f . . . f . . . . 
                    . . . . . . . f . . . f . . . . 
                    . . . . . . . . f f f . . . . . 
                    . . . . . . . . . f . . . . . . 
                    . . . . . . . . . f . . . . . . 
                    . . . . . . . . f f f f f f f f 
                    . . . . . . . . f . . . . . . . 
                    . . . . . . . . f . . . . . . . 
                    . . . . . . . f . . . . . . . . 
                    . . . . . . f f f f . . . . . . 
                    . . . . . f . . . f f . . . . . 
                    . . . f f . . . . . f . . . . . 
                    `
        rushB = img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . f f f . . . . . . . . 
                    . . . . f . . . f . . . . . . . 
                    . . . . f . . . f . . . . . . . 
                    . . . . f . . . f . . . . . . . 
                    . . . . . f f f . . . . . . . . 
                    . . . . . . f . . . . . . . . . 
                    . . . . . . f . . . . . . . . . 
                    . . . . . f f f f f f . . . . . 
                    . . . . f f . f . . . . . . . . 
                    . . . . f . . f . . . . . . . . 
                    . . . . . . . . f f f f f f f f 
                    . . . . . . f f f . . . . . . . 
                    . . . . . f . . . . . . . . . . 
                    . . . . . . f f f . . . . . . . 
                    `
        hand = img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . 2 2 2 2 2 2 . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `
        rushhand = img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . 2 2 2 2 2 2 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `
        leg = img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . 2 
            . . . . . . . . . . . . . . 2 2 
            . . . . . . . . . . . . . 2 2 . 
            . . . . . . . . . . . . 2 2 . . 
            . . . . . . . . . . . 2 2 . . . 
            . . . . . . . . . . 2 2 . . . . 
            . . . . . . . . . 2 2 . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `
        rushleg = img`
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
            . . . . . . . . . 2 2 2 2 2 2 2 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `
        hurtedimg = [img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . f f f . . . . . .
            . . . . . . f . . . f . . . . .
            . . . . . . f . . . f . . . . .
            . . . . . . f . . . f . . . . .
            . . . . . . . f f f . . . . . .
            . . . . . . f f . . . . . . . .
            . . . . . f f f f . . . . . . .
            . . . f f f . . f . . . . . . .
            . . . f . f f . f . . . . . . .
            . . . . . . f f . . . . . . . .
            . . . . . . f f f f . . . . . .
            . . . . . . . f . f f . . . . .
            . . . . . . f . . . f . . . . .
        `,
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . f f f . . . . . . . . . . . .
            f . . . f . . . . . . . . . . .
            f . . . f . . . . . . . . . . .
            f . . . f . . . . . . . . . . .
            . f f f . . . . . . . . . . . .
            . . f . . . . . . . . . . . . .
            . f f f f f f . . . . . . . . .
            . f . f f . f f f . . . . . . .
            f f . . f f . . f f . . . . . .
            f . . . . f f f . f . . . . . .
            f f . . . . . f f . . . . . . .
            . . . . . . f f f f . . . . . .
            . . . . . f . . . . f f . . . .
            . . . . . f . . . . . . f . . .
        `,
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . f f f . . . . . . . . . . . .
            f . . . f . . . . . . . . . . .
            f . . . f . . f . . . . . . . .
            f . . . f . . f . . . . . . . .
            . f f f . . f f . . . . . . . .
            . . f . . f f . . . . . . . . .
            . f f f f f . . . . . . . . . .
            . f . f f . . . . . . . . . . .
            f f . . f f . . . . . . . . . .
            f . . . . f f f f . . . . . . .
            . . . . . . . f f f f . . . . .
            . . . . . . . f . . f f . . . .
            . . . . . . . f f . . f f . . .
            . . . . . . . . f f . . . . . .
        `]
        walkimg = [img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . f f . . . . . .
            . . . . . . . f . . f . . . . .
            . . . . . . . f . . f . . . . .
            . . . . . . . f . . f . . . . .
            . . . . . . . . f f . . . . . .
            . . . . . . . f f . . . . . . .
            . . . . . . . f f . . . . . . .
            . . . . . f f f f f f . . . . .
            . . . . f f . f . . . . . . . .
            . . . . f . . f . . . . . . . .
            . . . . . . f f f . . . . . . .
            . . . . . f f . f f . f . . . .
            . . . . f f . . . f f f . . . .
            . . . . f . . . . . . . . . . .
        `,
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . f f . . . . . . .
            . . . . . . f . . f . . . . . .
            . . . . . . f . . f . . . . . .
            . . . . . . f . . f . . . . . .
            . . . . . . . f f . . . . . . .
            . . . . . . . f . . f . . . . .
            . . . . . f f f . . f . . . . .
            . . . . f f . f f f f . . . . .
            . . . . f . . f . . . . . . . .
            . . . f f . f f . . . . . . . .
            . . . . . . f f f . . . . . . .
            . . . . . f f . f . . . . . . .
            . . . . f f . . f f . . . . . .
            . . . . . . . . . f f . . . . .
        `,
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . f f . . . . . . .
            . . . . . . f . . f . . . . . .
            . . . . . . f . . f . . . . . .
            . . . . . . f . . f . . . . . .
            . . . . . . . f f . . . . . . .
            . . . . . . . f . . f . . . . .
            . . . . . . . f . . f . . . . .
            . . . . . f f f f f f . . . . .
            . . . . f f . f . . . . . . . .
            . . . . f . . f . . . . . . . .
            . . . f . . f f . . . . . . . .
            . . . f f f f f . . . . . . . .
            . . . . . . . f f f . . . . . .
            . . . . . . . . . f f . . . . .
        `
        ]

        //% group="人物参数" blockSetVariable="player"
        //% blockCombine block="精灵" callInDebugger
        get sprite(): Sprite {
            return this.mySprite
        }

        //% group="人物参数" blockSetVariable="player"
        //% blockCombine block="敌方精灵" callInDebugger
        get enemy(): Sprite {
            return this.enemySprite
        }

        //% group="人物参数" blockSetVariable="player"
        //% blockCombine block="x" callInDebugger
        get x(): number {
            return this.mySprite.x
        }

        //% group="人物参数" blockSetVariable="player"
        //% blockCombine block="y" callInDebugger
        get y(): number {
            return this.mySprite.y
        }

        //% group="人物参数" blockSetVariable="player"
        //% blockCombine block="血量" callInDebugger
        get hp(): number {
            return this.statusbar.value
        }

        //% group="人物参数" blockSetVariable="player"
        //% blockCombine block="血量" callInDebugger
        set hp(v : number) {
            this.statusbar.value = v
        }

        // 暂停控制
        stop () {
            this.move(0)
        }
        // 恢复控制
        move (speed: number) {
            this.player.moveSprite(this.mySprite, speed, 0)
        }

        // 从攻击、硬直、防御、奔跑等状态恢复
        stand (interrupt : boolean = false) {
            if(!interrupt || (2&this.attack|this.hurted) == 0){
                this.attack = 0
                this.mySprite.setImage(this.standard)
                this.hurted = 0
                this.defence = 0
                if(this.rush == 1){
                    this.rush = 0
                    this.skill = 0
                    this.rightDOWN = 0
                    this.leftDOWN = 0
                }
                if(this.jump == 0){
                    this.mySprite.vx = 0
                    this.move(this.walkspeed)
                }
            }
        }
        // 落地之后做某事
        toground(dosth: ()=>void){
            let ty = this.mySprite.y
            this.jumpclock = setInterval(()=>{
                if(this.mySprite.y == ty){
                    dosth()
                    clearInterval(this.jumpclock)
                }
                else{
                    ty = this.mySprite.y
                }
            }, 100)
        }
    //=================== 中弹 ===================
        hits = 0
        hits2 = 0
        overlap(sprite: Sprite, otherSprite: Sprite) {
            if(this.immu == 1){
                sprite.destroy();

                return
            }
            if((<wave>sprite).damage == 0){
                return
            }
            if (this.defence == 1 && !((<wave>sprite).breakdef)) {
                clearTimeout(this.defclock)
                this.defclock = -1
                this.statusbar.value -= (<wave>sprite).damage * this.def
                let img = this.defenceimg.clone()
                if(sprite.x < otherSprite.x){
                    img.flipX()
                    this.laspres = 1
                }
                else{
                    this.laspres = 2
                }
                this.mySprite.setImage(img)
                this.hurted = -1
                this.defclock = setTimeout(()=>{
                    if(this.hurted == -1){
                        this.hurted = 0
                    }
                    this.defclock = -1
                }, this.defact)
            } else {
                if(this.attack == 2){
                    clearInterval(this.attackclock)
                }
                if(this.hurted != 2){
                    this.hurted = 2
                    clearTimeout(this.hitclock2)
                    this.hitclock2 = setTimeout(()=>{
                        if(this.hurted == 2){
                            this.hurted = 1
                            this.hits2 = this.hits
                        }
                        this.hitclock2 = -1
                    }, 100)
                }
                //this.hurted = 1
                animation.stopAnimation(animation.AnimationTypes.All, this.mySprite)
                this.defence = 0
                this.attack = 0
                this.skill = 0
                this.mySprite.vx = 0
                this.statusbar.value -= (<wave>sprite).damage
                if(this.hits < -100){
                    if(this.hurted != 2){
                        this.mySprite.vy = Math.max(this.mySprite.vy-(<wave>sprite).yspeed, -150)
                        this.mySprite.vx = sprite.x < otherSprite.x ? (<wave>sprite).xspeed : -(<wave>sprite).xspeed
                        this.mySprite.image.flipY()
                    }
                }
                else{
                    this.hits = Math.max(this.hits2+(<wave>sprite).hurted, this.hits)
                    //this.hits += (<wave>sprite).hurted //Math.max(++this.hits, (<wave>sprite).hurted)
                    this.hitrec((<wave>sprite).hitrec, this.hits-1, sprite.x < otherSprite.x, <wave>sprite)
                }
            }
            sprite.destroy();

            if (this.statusbar.value == 0) {
                if(this.player == controller.player1){
                    game.splash("player2 win!")
                }
                else{
                    game.splash("player1 win!")
                }
                game.reset()
            }
        }

        hitrec(time: number, kind: number, dir: boolean, pro: wave){
            clearTimeout(this.hitclock)
            this.hitclock = -1
            clearTimeout(this.hurtclock)
            this.hurtclock = -1
            if(kind >= this.hurtedimg.length || this.jump == 1){
                this.stop()
                this.mySprite.setImage(this.hitover.clone())
                this.hits = -999
                this.mySprite.vy = -pro.yspeed
                this.mySprite.vx = dir ? pro.xspeed : -pro.xspeed
                if(this.jump == 1){
                    clearInterval(this.jumpclock)
                    this.jump = 0
                }
                this.toground(()=>{
                    this.mySprite.setImage(this.lieimg.clone())
                    if(dir){
                        this.mySprite.image.flipX()
                    }
                    this.mySprite.vx = 0
                    this.immu = 1
                    this.hits = 0
                    this.hits2 = 0
                    setTimeout(()=>{
                        this.stand()
                        setTimeout(()=>{
                            this.immu = 0
                        }, this.immutime)
                    }, this.downtime)
                })
            }
            else{
                this.mySprite.setImage(this.hurtedimg[kind].clone())
                this.hurtclock = setTimeout(()=>{this.stand(); this.hurtclock = -1}, time)
                this.hitclock = setTimeout(()=>{this.hits = 0; this.hitclock = -1}, 1000)
            }
            if(dir){
                this.mySprite.image.flipX()
                this.laspres = 1
            }
            else {
                this.laspres = 2
            }
        }
    //=================== 攻击行为 ===================
        attackPosture(atk: Image, life: number){
            this.attack = 1
            let img222 = atk.clone()
            if (this.laspres == 1) {
                img222.flipX()
            }
            animation.stopAnimation(animation.AnimationTypes.All, this.mySprite)
            let projectile = <wave>sprites.createProjectileFromSprite(img222, this.mySprite, this.mySprite.vx, 0)
            projectile.lifespan = life;
            let follow = setInterval(()=>{
                if(projectile != null){
                    if(this.hurted == 0){
                        projectile.setPosition(this.mySprite.x, this.mySprite.y)
                    }
                    else{
                        projectile.destroy();

                    }
                }
            }, 10)
            setTimeout(()=>{
                clearInterval(follow)
                if(projectile != null){
                    projectile.destroy();
                }
            }, life)
            reset(projectile)
            projectile.setKind(this.bulletkind)
            projectile.indeflectible = true
            return projectile
        }
        attackAction (atk: Image, life: number, Aatk: boolean) {
            let projectile = this.attackPosture(atk, life)
            if(Aatk){
                reset(projectile, this.damageA, this.hitrecA)
            }
            else{
                reset(projectile, this.damageB, this.hitrecB, 2)
            }
        }
        
        rushAttack(atk = 'A', time = 300){
            let f = atk == 'A'
            this.attackAction(f ? this.rushhand : this.rushleg, time, f)
            this.defence = 0
            this.mySprite.setImage((f ? this.rushA : this.rushB).clone())
            if (this.laspres == 1) {
                this.mySprite.image.flipX()
            }
            setTimeout(()=>{this.stand(true)}, time)
        }
        basicAttack(atk = 'A', time = 200){
            let h = atk == 'A'
            this.attackAction(h ? this.hand : this.leg, time, h)
            this.defence = 0
            this.stop()
            this.mySprite.setImage((h ? this.attackA : this.attackB).clone())
            if (this.laspres == 1) {
                this.mySprite.image.flipX()
            }
            setTimeout(()=>{this.stand(true)}, time)
        }
        defaultshoot = (s:wave)=>{}

        // 自动攻击，暂停控制，按[下]退出
        autoAttack(time: number, atk: ()=>void){
            this.stop()
            this.attack = 2
            this.attackclock = setInterval(atk, time)
            this.defence = 0
        }
        // 反击，防御状态被攻击才能发出
        counterAttack(atk: ()=>void){
            if(this.hurted == -1){
                this.hurted = 0
                this.skill = 0
                atk()
            }
        }

        defaultskill(){
            //=================== A键释放的技能 ===================
            setSkill(this, SkillKind.A,(that: Character)=>{ //平A: A
                that.basicAttack('A')
            })
            
            setSkill(this, SkillKind.A1,(that: Character)=>{ //反击: ⬇️+A
                that.counterAttack(()=>{
                    that.basicAttack('A')
                    let s = 60
                    for(let i = 0; i < 3; ++i){
                        for(let i = 0; i < 3; ++i){
                            shoot(that, 60, 180, 4, s, that.mySprite.x, that.mySprite.y, img`
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . 4 4 . . . . . . .
                                . . . . . . 4 5 5 4 . . . . . .
                                . . . . . . 2 5 5 2 . . . . . .
                                . . . . . . . 2 2 . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                            `, that.defaultshoot)
                            s += 3
                        }
                        shoot(that, 60, 180, 4, s, that.mySprite.x, that.mySprite.y, img`
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . 4 4 . . . . . . .
                            . . . . . . 4 5 5 4 . . . . . .
                            . . . . . . 2 5 5 2 . . . . . .
                            . . . . . . . 2 2 . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                        `, that.defaultshoot)
                        s += 10
                    }
                })
            })

            setSkill(this, SkillKind.A2,(that: Character)=>{ //跳起攻击: ⬆️+A
                that.basicAttack('A')
            })

            setSkill(this, SkillKind.A3,(that: Character)=>{ //跳起特殊攻击: ⬇️+⬆️+A
                that.basicAttack('A')
                let offset2 = 0
                let acc = 0
                for(let i = 0; i < 4; ++i){
                    shoot(that, 120+offset2, 300+offset2, 6, 50+acc, that.mySprite.x, that.mySprite.y, img`
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . 2 2 . . . . . . .
                        . . . . . . 3 1 1 3 . . . . . .
                        . . . . . 2 1 1 1 1 2 . . . . .
                        . . . . . 2 1 1 1 1 2 . . . . .
                        . . . . . . 3 1 1 3 . . . . . .
                        . . . . . . . 2 2 . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                    `, (s:wave)=>{
                        s.lifespan = 600
                        s.damage = 1
                    })
                    offset2 += 5
                    acc += 5
                }
            })

            setSkill(this, SkillKind.A4,(that: Character)=>{ //冲刺: ➡️➡️+A
                that.rushAttack('A')
            })

            setSkill(this, SkillKind.A6,(that: Character)=>{ //冲跳攻: ➡️➡️+⬆️+A
                that.rushAttack('A')
            })

            setSkill(this, SkillKind.A8,(that: Character)=>{ //平A2: ➡️+A
                that.basicAttack('A')
                shoot(that, 180, 180, 1, 60, that.mySprite.x,that.mySprite.y,img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . 8 8 8 8 . . .
                    . . . . . . . 8 8 1 1 1 1 8 . .
                    . . . . 8 8 9 9 1 1 1 1 1 1 8 .
                    . . 9 9 9 9 1 1 1 1 1 1 1 1 8 .
                    . . 1 1 1 1 1 1 1 1 1 1 1 1 8 .
                    . . 9 9 8 8 9 1 1 1 1 1 1 1 8 .
                    . . . . . . 8 8 9 1 1 1 1 8 . .
                    . . . . . . . . . 8 8 8 8 . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                `, (b:wave)=>{
                    b.hitrec = 1200
                })
            })

            setSkill(this, SkillKind.A9,(that: Character)=>{ //反击2: ↘️+A
                that.basicAttack('A')
                let s = 40
                let a = 10
                let t = 600
                for(let i = 0; i < 8; ++i){
                    shoot(that, a, a, 1, s, that.mySprite.x, that.mySprite.y, img`
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . 6 6 . . . . . . .
                        . . . . . . 6 9 9 6 . . . . . .
                        . . . . . . 8 9 9 8 . . . . . .
                        . . . . . . . 8 8 . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                    `,
                    (b: wave)=>{
                        setTimeout(()=>{
                            b.vx *= 1.5
                            b.vy *= 1.5
                            aimedshot(that, b)
                        }, t)
                    })
                    s += 10
                    a+= 160/8
                    t += 100
                }
            })

            setSkill(this, SkillKind.A10,(that: Character)=>{ //必杀: ⬇️+➡️+A
                that.rushAttack('A')
                let d = that.laspres == 1 ? -10 : 10
                shoot(that, 180, 180, 1, 60, that.mySprite.x+d,that.mySprite.y,img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . 2 2 2 2 . . .
                    . . . 2 2 2 2 2 2 1 1 1 1 2 . .
                    . . . 3 3 3 3 3 1 1 1 1 1 1 . .
                    . . . 1 1 1 1 1 1 1 1 1 1 1 . .
                    . . . 1 1 1 1 1 1 1 1 1 1 1 . .
                    . . . 3 3 3 3 3 1 1 1 1 1 1 . .
                    . . . 2 2 2 2 2 3 1 1 1 1 2 . .
                    . . . . . . . . . 2 2 2 2 . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                `, (s:wave)=>{
                        s.damage = 1
                        s.indeflectible = true
                    })
                that.autoAttack(185,()=>{
                    shoot(that, 180, 180, 1, 60, that.mySprite.x+d,that.mySprite.y,img`
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . 2 2 2 2 2 2 2 2 2 2 2 2 . .
                        . . 3 3 3 3 3 3 3 3 3 3 3 3 . .
                        . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
                        . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
                        . . 3 3 3 3 3 3 3 3 3 3 3 3 . .
                        . . 2 2 2 2 2 2 2 2 2 2 2 2 . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                    `, (s:wave)=>{
                        s.damage = 1
                        s.indeflectible = true
                    })
                })
            })
            //=================== B键释放的技能 ===================
            setSkill(this, SkillKind.B,(that: Character)=>{ //平A: B
                that.basicAttack('B')
            })

            setSkill(this, SkillKind.B1,(that: Character)=>{ //反击: ⬇️+B
                that.basicAttack('B')
            })

            setSkill(this, SkillKind.B2,(that: Character)=>{ //跳起攻击: ⬆️+B
                that.basicAttack('B')
            })

            setSkill(this, SkillKind.B3,(that: Character)=>{ //跳起特殊攻击: ⬇️+⬆️+B
                let e = -5
                if(that.enemySprite.x > that.mySprite.x){
                    that.laspres = 1
                    e = -e
                }
                else that.laspres = 2
                that.mySprite.setPosition(that.enemySprite.x+e, that.enemySprite.y)
                that.basicAttack('B')
            })

            setSkill(this, SkillKind.B4,(that: Character)=>{ //冲刺: ➡️➡️+B
                that.rushAttack('B')
            })

            setSkill(this, SkillKind.B6,(that: Character)=>{ //冲跳攻: ➡️➡️+⬆️+B
                that.rushAttack('B')
            })

            setSkill(this, SkillKind.B8,(that: Character)=>{ //平A2: ➡️+B
                that.rushAttack('A') //'B'
                let x = that.laspres == 1 ? -15 : 15
                let j = x
                let u = 0
                for(let index2 = 0; index2 < 3; index2++){
                    setTimeout(()=>{
                        shoot(that, 180,180,1,0,that.mySprite.x+x,that.mySprite.y,img`
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
                        `,(s)=>{
                            let pro = sprites.createProjectileFromSprite(img`
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
                            `, s, 0, 0)
                            s.lifespan = 600
                            s.hurted = 4
                            s.breakdef = true
                            s.yspeed = 120
                            s.xspeed = 80
                            s.indeflectible = true
                            pro.lifespan = 600
                            animation.runImageAnimation(pro, [img`
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
                            `],200)
                        })
                        x += j
                    }, u)
                    u += 100
                }
            })

            setSkill(this, SkillKind.B9,(that: Character)=>{ //反击2: ↘️+B
                that.basicAttack('A')
                shoot(that, 0,0,1,0,that.mySprite.x,that.mySprite.y,img`
                    ......88888888......
                    .....8999999998.....
                    ....891111111198....
                    ...891........198...
                    ..891..........198..
                    .891............198.
                    891..............198
                    891..............198
                    891..............198
                    891..............198
                    891..............198
                    891..............198
                    891..............198
                    891..............198
                    .891............198.
                    ..891..........198..
                    ...891........198...
                    ....891111111198....
                    .....8999999998.....
                    ......88888888......
                `,(s)=>{
                    s.damage = 10
                    s.indeflectible = true
                    s.rebound = true
                    s.lifespan = 300
                })
            })

            setSkill(this, SkillKind.B10,(that: Character)=>{ //必杀: ⬇️+➡️+B
                that.rushAttack('B')
            })
        }
    //=================== A键释放的技能 ===================
        skill0A = (that: Character)=>{ //平A: A
            that.basicAttack('A')
        }

        skill1A = (that: Character)=>{ //反击: ⬇️+A
            that.basicAttack('A')
        }
        skill2A = (that: Character)=>{ //跳起攻击: ⬆️+A
            that.basicAttack('A')
        }

        skill3A = (that: Character)=>{ //跳起特殊攻击: ⬇️+⬆️+A
            that.basicAttack('A')
        }

        skill4A = (that: Character)=>{ //冲刺: ➡️➡️+A
            that.rushAttack('A')
        }

        skill6A = (that: Character)=>{ //冲跳攻: ➡️➡️+⬆️+A
            that.rushAttack('A')
        }

        skill8A = (that: Character)=>{ //平A2: ➡️+A
            that.basicAttack('A')
        }

        skill9A = (that: Character)=>{ //反击2: ↘️+A
            that.basicAttack('A')
        }
        
        skill10A = (that: Character)=>{ //必杀: ⬇️+➡️+A
            that.rushAttack('A')
        }
    //=================== B键释放的技能 ===================
        skill0B = (that: Character)=>{ //平A: B
            that.basicAttack('B')
        }

        skill1B = (that: Character)=>{ //反击: ⬇️+B
            that.basicAttack('B')
        }

        skill2B = (that: Character)=>{ //跳起攻击: ⬆️+B
            that.basicAttack('B')
        }

        skill3B = (that: Character)=>{ //跳起特殊攻击: ⬇️+⬆️+B
            that.basicAttack('B')
        }

        skill4B = (that: Character)=>{ //冲刺: ➡️➡️+B
            that.rushAttack('B')
        }

        skill6B = (that: Character)=>{ //冲跳攻: ➡️➡️+⬆️+B
            that.rushAttack('B')
        }

        skill8B = (that: Character)=>{ //平A2: ➡️+B
            that.rushAttack('A') //'B'
        }

        skill9B = (that: Character)=>{ //反击2: ↘️+B
            that.basicAttack('A')
        }

        skill10B = (that: Character)=>{ //必杀: ⬇️+➡️+B
            that.rushAttack('B')
        }
    //=================== 按键事件 ===================
        Adown () {
            if (this.attack != 0 || this.hurted > 0) {
                return
            }
            if(this.skill == 0){           
                this.skill0A(this)
            }
            else if(this.skill == 1){
                this.skill1A(this)
            }
            else if(this.skill == 2){
                this.skill2A(this)
            }
            else if(this.skill == 3){            
                this.skill3A(this)
            }
            else if(this.skill == 4){
                this.skill = 0
                this.skill4A(this)
            }
            else if(this.skill == 6){
                this.skill = 2
                this.skill6A(this)
            }
            else if(this.skill == 8){
                this.skill8A(this)
            }
            else if(this.skill == 9){
                this.skill = 0
                this.skill9A(this)
            }
            else if(this.skill == 10){
                this.skill = 0
                this.skill10A(this)
            }
            else this.attack = 0
        }
        Bdown () {
            if (this.attack != 0 || this.hurted > 0) {
                return
            }
            //this.attack = 1
            if(this.skill == 0){
                this.skill0B(this)
            }
            else if(this.skill == 1){
                this.skill1B(this)
            }
            else if(this.skill == 2){
                this.skill2B(this)
            }
            else if(this.skill == 3){
                this.skill3B(this)
            }
            else if(this.skill == 4){
                this.skill = 0
                this.skill4B(this)
            }
            else if(this.skill == 6){
                this.skill = 2
                this.skill6B(this)
            }
            else if(this.skill == 8){
                this.skill8B(this)
            }
            else if(this.skill == 9){
                this.skill = 0
                this.skill9B(this)
            }
            else if(this.skill == 10){
                this.skill = 0
                this.skill10B(this)
            }
            else this.attack = 0
        }
        downdown () {
            if(this.attack == 2){
                clearInterval(this.attackclock)
                this.stand()
            }
            if ((this.jump | this.defence | this.attack | this.hurted) != 0) {
                return
            }
            if (this.skill == 0 || this.skill == 8 || this.skill == 4) {
                this.skill = 1
            }
            clearTimeout(this.comboclock)
            this.comboclock = -1
            this.defence = 1
            this.move(this.walkspeed/2)
            animation.stopAnimation(animation.AnimationTypes.All, this.mySprite)
            this.mySprite.setImage(this.defenceimg.clone())
            if(this.laspres == 1){
                this.mySprite.image.flipX()
            }
        }
        downup () {
            if(this.attack == 2){
                return
            }
            setTimeout(()=>{
                if(this.defence == 1 && this.attack != 1){
                    this.stand()
                    if(this.skill == 1 || this.skill == 9 || this.skill == 10){
                        this.skill = 0
                    }
                }
            }, this.defencelas)
            
        }
        updown () {
            if (this.hurted != 0 || this.attack != 0) {
                return
            }
            if (this.jump == 0) {
                clearTimeout(this.comboclock)
                this.comboclock = -1
                if(this.skill == 0 || this.skill == 8){
                    this.skill = 2
                }
                else if(this.skill == 1 || this.skill == 9 || this.skill == 10){
                    this.skill = 3
                }
                else if(this.skill == 4){
                    this.skill = 6
                }
                if(this.defence == 1){
                    this.stand()
                }
                // 起跳后无法左右移动
                this.stop()
                this.jump = 1
                if (this.leftDOWN == 1 || this.leftDOWN == -1) {
                    this.mySprite.vx = -this.walkspeed
                } else if (this.rightDOWN == 1 || this.rightDOWN == -1) {
                    this.mySprite.vx = this.walkspeed
                }
                this.mySprite.vy = -this.jumpspeed
                this.toground(()=>{
                    this.jump = 0
                    this.skill = 0
                    if(this.hurted == 0)
                        this.move(this.walkspeed) //恢复控制
                    this.mySprite.vx = 0
                })
                this.clearcombo()
            }
        }
        rightdown(){
            if(this.jump != 0){
                this.laspres = 2
                this.rightDOWN = 1
                clearTimeout(this.comboclock)
                this.comboclock = -1
                this.clearcombo(300)
                return
            }
            if ((this.attack | this.hurted) != 0) {
                return
            }
            if(this.leftDOWN == 1){
                this.leftup()
            }
            if (this.rush == 1) {
                if (this.mySprite.vx > 0) {
                    return
                }
                this.stand()
                this.mySprite.vx = 0
                this.skill = 0
            }
            else if(this.skill == 0){
                this.skill = 8
            }
            else if(this.skill == 1 || this.skill == 10){
                this.skill = 9
            }
            clearTimeout(this.comboclock)
            this.comboclock = -1
            this.laspres = 2
            if (this.combo == 1 && this.laspres == 2 && this.rightDOWN == 2 && this.defence != 1) {
                this.stop()
                this.mySprite.vx = this.rushspeed
                this.rush = 1
                this.skill = 4
                this.rightDOWN = 3
            }
            if(this.rightDOWN == 0){
                this.rightDOWN = 1
                this.clearcombo(300)
            }
        }
        rightup(){
            if (this.rightDOWN == 1 || this.rightDOWN == -1) {
                clearTimeout(this.comboclock)
                this.comboclock = -1
                this.clearcombo(300)
                if(this.skill == 8){
                    this.skill = 0
                }
                else if(this.skill == 9){
                    this.skill = 10
                }
                this.rightDOWN = this.rightDOWN == 1  ? 2 : 0
            }
        }
        leftdown(){
            if(this.jump != 0){
                this.laspres = 1
                this.leftDOWN = 1
                clearTimeout(this.comboclock)
                this.comboclock = -1
                this.clearcombo(300)
                return
            }
            if ((this.attack | this.hurted) != 0) {
                return
            }
            if(this.rightDOWN == 1){
                this.rightup()
            }
            if (this.rush == 1) {
                if (this.mySprite.vx < 0) {
                    return
                }
                this.stand()
                this.mySprite.vx = 0
                this.skill = 0
            }
            else if(this.skill == 0){
                this.skill = 8
            }
            else if(this.skill == 1 || this.skill == 10){
                this.skill = 9
            }
            this.laspres = 1
            clearTimeout(this.comboclock)
            this.comboclock = -1
            if (this.combo == 1 && this.laspres == 1 && this.leftDOWN == 2 && this.defence != 1) {
                this.stop()
                this.mySprite.vx = 0 - this.rushspeed
                this.rush = 1
                this.skill = 4
                this.leftDOWN = 3
            }
            if(this.leftDOWN == 0){
                this.leftDOWN = 1
                this.clearcombo(300)
            }
        }
        //                        |->timeout(0)
        // 0 -> leftdown(1) -> leftup(2) -> leftdown(3.rush)
        //        |->timeout(-1) -> leftup(0)
        leftup(){
            if (this.leftDOWN == 1 || this.leftDOWN == -1) {
                clearTimeout(this.comboclock)
                this.comboclock = -1
                this.clearcombo(300)
                if(this.skill == 8){
                    this.skill = 0
                }
                else if(this.skill == 9){
                    this.skill = 10
                }
                this.leftDOWN = this.leftDOWN == 1  ? 2 : 0
            }
        }
        clearcombo (t = 500) {
            // 连击准备，t ms后清除
            this.combo = 1
            this.comboclock = setTimeout(()=>{
                this.combo = 0
                if(this.skill == 9 || this.skill == 10){
                    this.skill = this.defence == 1 ? 1 : 0
                }
                else if(this.skill == 8){
                    this.skill = 0
                }
                this.leftDOWN = this.leftDOWN == 1 ? -1 : 0
                this.rightDOWN = this.rightDOWN == 1 ? -1 : 0
                this.comboclock = -1
            }, t)
        }
    //=================== 初始化 ===================
        statusbar: StatusBarSprite
        constructor(public mySprite: Sprite, public player: controller.Controller, public bulletkind: number){
            if(player == controller.player1){
                this.laspres = 2
            }
            else{
                this.laspres = 1
            }
            this.mySprite.setFlag(SpriteFlag.Ghost, true)
            this.mySprite.setFlag(SpriteFlag.Invisible, true)
            this.statusbar = statusbars.create(50, 4, StatusBarKind.Health)
            this.statusbar.positionDirection(CollisionDirection.Top)
            this.statusbar.setOffsetPadding(-66666, 0)
        }
        walkInterval = 200
        startcontroll(){
            
            this.mySprite.setFlag(SpriteFlag.Ghost, false)
            this.mySprite.setFlag(SpriteFlag.Invisible, false)
            if(this.player == controller.player1){
                this.statusbar.setOffsetPadding(-53, 0)
            }
            else{
                this.statusbar.setOffsetPadding(53, 0)
            }
            let f = -1 //0: right, 1: left, -1: stop
            let wimg = <Image[]>[]
            for(let i = 0; i < this.walkimg.length; ++i){
                wimg.push(this.walkimg[i].clone())
                wimg[i].flipX()
            }
            game.onUpdate(function() {
                // if(this.player == controller.player1)
                // {
                //     console.log([this.defence, this.rightDOWN, this.leftDOWN])
                // }
                if( (this.rightDOWN&1) == 1
                    && (this.hurted | this.jump | this.defence | this.attack) == 0){
                    if(f != 0){
                        f = 0
                        animation.stopAnimation(animation.AnimationTypes.All, this.mySprite)
                        animation.runImageAnimation(this.mySprite, this.walkimg, this.walkInterval, true)
                    }
                }
                else if((this.leftDOWN&1) == 1 
                        && (this.hurted | this.jump | this.defence | this.attack) == 0){
                    if(f != 1){
                        f = 1
                        animation.stopAnimation(animation.AnimationTypes.All, this.mySprite)
                        animation.runImageAnimation(this.mySprite, wimg, this.walkInterval, true)
                    }
                }
                else{
                    f = -1
                    animation.stopAnimation(animation.AnimationTypes.All, this.mySprite)
                    if((this.hurted | this.attack | this.defence | this.jump) == 0){
                        this.mySprite.setImage(this.standard)
                    }
                }
            })

            this.player.onButtonEvent(ControllerButton.Down, ControllerButtonEvent.Pressed, function () {
                this.downdown()
            })
            this.player.onButtonEvent(ControllerButton.Down, ControllerButtonEvent.Released, function () {
                this.downup()
            })
            this.player.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
                this.updown()
            })
            this.player.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
                this.leftdown()
            })
            this.player.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
                this.Adown()
            })
            this.player.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
                this.rightdown()
            })
            this.player.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Released, function () {
                this.leftup()
            })
            this.player.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
                this.Bdown()
            })
            this.player.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Released, function () {
                this.rightup()
            })
            this.player.moveSprite(this.mySprite, this.walkspeed, 0)
        }
    }

    function shoot(p: Character, beginAngel: number, endAngel: number, n: number, speed: number, 
        x: number, y: number, img: Image, 
            handle: (sprite: wave)=>void){
        let offset = Math.max(1, (endAngel-beginAngel)/n)
        beginAngel = (180+beginAngel)// % 360
        endAngel = (180+endAngel)// % 360
        for(let index = beginAngel; index <= endAngel; index += offset)
        {
            let bullet = <wave>sprites.createProjectileFromSide(img.clone(), 0, 0)
            reset(bullet)
            bullet.setPosition(x, y)
            bullet.setVelocity(speed*Math.cos(index/57.3), speed*Math.sin(index/57.3))
            if(p.laspres == 1){
                bullet.vx = -bullet.vx
                bullet.image.flipX()
            }
            bullet.setKind(p.bulletkind)
            handle(bullet)
        }
    }

//=================== 技能设置 ===================
    //%block
    //%group="技能设置"
    //%afterOnStart=true
    //%blockId=setSkill block="设置技能 %player=variables_get(player) %str=SkillKind"
    //%str.defl=SkillKind.A
    //%weight=90
    //%draggableParameters="player"
    export function setSkill(player: Character, str: SkillKind, skill: (player: Character)=>void){
        if(str == SkillKind.A){ //平A: A
            player.skill0A = skill
        }else if(str == SkillKind.A1){ //反击: ⬇️+A
            player.skill1A = skill
        }else if(str == SkillKind.A2){ //跳起攻击: ⬆️+A
            player.skill2A = skill
        }else if(str == SkillKind.A3){ //跳起特殊攻击: ⬇️+⬆️+A
            player.skill3A = skill
        }else if(str == SkillKind.A4){ //冲刺: ➡️➡️+A
            player.skill4A = skill
        }else if(str == SkillKind.A6){ //冲跳攻: ➡️➡️+⬆️+A
            player.skill6A = skill
        }else if(str == SkillKind.A8){ //平A2: ➡️+A
            player.skill8A = skill
        }else if(str == SkillKind.A9){ //反击2: ↘️+A
            player.skill9A = skill
        }else if(str == SkillKind.A10){ //必杀: ⬇️+➡️+A
            player.skill10A = skill
        }else if(str == SkillKind.B){ //平A: B
            player.skill0B = skill
        }else if(str == SkillKind.B1){ //反击: ⬇️+B
            player.skill1B = skill
        }else if(str == SkillKind.B2){ //跳起攻击: ⬆️+B
            player.skill2B = skill
        }else if(str == SkillKind.B3){ //跳起特殊攻击: ⬇️+⬆️+B
            player.skill3B = skill
        }else if(str == SkillKind.B4){ //冲刺: ➡️➡️+B
            player.skill4B = skill
        }else if(str == SkillKind.B6){ //冲跳攻: ➡️➡️+⬆️+B
            player.skill6B = skill
        }else if(str == SkillKind.B8){ //平A2: ➡️+B
            player.skill8B = skill
        }else if(str == SkillKind.B9){ //反击2: ↘️+B
            player.skill9B = skill
        }else if(str == SkillKind.B10){ //必杀: ⬇️+➡️+B
            player.skill10B = skill
        }
    }

    //默认技能
    //%block
    //%group="技能设置"
    //%blockId=defaultSkill block="使用默认技能 %player=variables_get(player)"
    //%str.defl=SkillKind.A
    export function defalutSkill(player: Character){
        player.defaultskill()
    }

    //%block
    //%group="技能设置"
    //%blockId=shoot block="%p=variables_get(player) 发射 %img=screen_image_picker 从x $x y $y ||朝向角度 $a 速度 $s"
    //%a.defl=0 s.defl=50 x.defl=0 y.defl=0 
    //%weight=80
    //%blockSetVariable=projectile
    //%inlineInputMode=inline
    export function shoot2(p: Character, img: Image, x: number, y: number, 
    a: number = 0, s: number = 50): myGame.wave{
        let bullet = <wave>sprites.createProjectileFromSide(img.clone(), 0, 0)
        reset(bullet)
        bullet.setPosition(x, y)
        a+=180
        bullet.setVelocity(s*Math.cos(a/57.3), s*Math.sin(a/57.3))
        if(p.laspres == 1){
            bullet.vx = -bullet.vx
            bullet.image.flipX()
        }
        bullet.setKind(p.bulletkind)
        return bullet
    }

    //%block
    //%group="技能设置"
    //%blockId=setBullet block="设置弹射物%b=variables_get(projectile) 属性 %k=bulletP 为 %v"
    //%v.defl=0
    export function setBullet(b:wave, k: bulletP, v: number){
        if(k == bulletP.damage){
            b.damage = v
        }
        else if(k == bulletP.hitrec){
            b.hitrec = v
        }
        else if(k == bulletP.hurted){
            b.hurted = v
        }
        else if(k == bulletP.xspeed){
            b.xspeed = v
        }
        else if(k == bulletP.yspeed){
            b.yspeed = v
        }
    }

    //%block
    //%group="技能设置"
    //%blockId=setBullet2 block="设置弹射物%b=variables_get(projectile) 特殊效果 %k=bulletP2 为 %v"
    //%v.defl=true
    export function setBullet2(b:wave, k: bulletP2, v: boolean){
        if(k == bulletP2.breakdef){
            b.breakdef = v
        }
        else if(k == bulletP2.rebound){
            b.rebound = v
        }
        else if(k == bulletP2.indeflectible){
            b.indeflectible = v
        }
    }

    // 自机狙
    //%group="技能设置"
    //%blockId=aimedshot block="(自机狙) %player=variables_get(player) 的弹射物 %bullet=variables_get(projectile) 转向敌方"
    export function aimedshot(p: Character, bullet: wave){
        let angel = Math.atan2(p.enemySprite.y-bullet.y, p.enemySprite.x-bullet.x)
        let speed = Math.sqrt(bullet.vx*bullet.vx+bullet.vy*bullet.vy)
        bullet.setVelocity(speed*Math.cos(angel),speed*Math.sin(angel))
    }

    // 反击，防御状态被攻击才能发出
    //%group="技能设置"
    //%blockId=counterAttack block="(反击) %p=variables_get(player) 尝试执行 %act=variables_get(action) %b=variables_get(projectile)"
    export function counterAttack(p: Character, act: action, b: wave){
        p.counterAttack(()=>act.act(p, b))
    }

    // 自动攻击，暂停控制，按[下]退出
    //%group="技能设置"
    //%blockId=autoAttack block="(持续攻击) %p=variables_get(player) 每隔 %time 秒自动执行 %act=variables_get(action) %b=variables_get(projectile)"
    //%time.defl=0
    //%inlineInputMode=inline
    export function autoAttack(p: Character, time: number, act: action, b: wave){
        p.autoAttack(time*1000, ()=>act.act(p, b))
    }

//=================== 人物动作 ===================
    //%block
    //%group="人物动作"
    //%blockId=attackAction block="攻击 %p=variables_get(player) %atk=atkKind ||持续 $time 秒"
    //%time.defl = 0
    //%inlineInputMode=inline
    //%weight=99
    export function atkAction(p:Character, atk: atkKind, time: number = 0){
        if(atk == atkKind.BasicAtkA){
            if(time == 0){
                p.basicAttack('A')
            }
            else{
                p.basicAttack('A', time*1000)
            }
        }
        else if(atk == atkKind.RushAtkA){
            if(time == 0){
                p.rushAttack('A')
            }
            else{
                p.rushAttack('A', time*1000)
            }
        }
        else if(atk == atkKind.BasicAtkB){
            if(time == 0){
                p.basicAttack('B')
            }
            else{
                p.basicAttack('B', time*1000)
            }
        }
        else if(atk == atkKind.RushAtkB){
            if(time == 0){
                p.rushAttack('B')
            }
            else{
                p.rushAttack('B', time*1000)
            }
        }
    }

    //%block
    //%group="人物动作"
    //%blockId=jump block="起跳 %p=variables_get(player)"
    //%weight=98
    export function jump(p: Character){
        p.updown();
    }

    //%block
    //%group="人物动作"
    //%blockId=movetoxy block="移动 %p=variables_get(player) 在%time 秒内接近 位置x %desx y %desy"
    //%inlineInputMode=inline
    export function movetoxy (sprite: Sprite, time: number, desx: number, desy: number) {
        movetox(sprite, time, desx)
        movetox(sprite, time, desy)
    }

    //%block
    //%group="人物动作"
    //%blockId=movetox block="移动 %p=variables_get(player) 在%time 秒内接近 位置x %desx"
    //%inlineInputMode=inline
    export function movetox (sprite: Sprite, time: number, desx: number) {
        let clock = setInterval(()=>{
            sprite.vx = (desx - sprite.x) / time
        }, time*10)
        setTimeout(()=>clearInterval(clock), time*1100)
    }

    //%block
    //%group="人物动作"
    //%blockId=movetoy block="移动 %p=variables_get(player) 在%time 秒内接近 位置y %desy"
    //%inlineInputMode=inline
    export function movetoy (sprite: Sprite, time: number, desy: number) {
        let clock = setInterval(()=>{
            sprite.vy = (desy - sprite.y) / time
        }, time*10)
        setTimeout(()=>clearInterval(clock), time*1100)
    }

    //%block
    //%group="人物动作"
    //%blockId=movexy block="移动 %p=variables_get(player) 在%time 秒内移动 x %dx y %dy"
    //%inlineInputMode=inline
    export function movexy (sprite: Sprite, time: number, dx: number, dy: number) {
        if(dx != 0){
            movetox(sprite, time, sprite.x+dx)
        }
        if(dy != 0){
            movetoy(sprite, time, sprite.y+dy)
        }
    }

    //%block
    //%group="人物动作"
    //%blockId=accelerateToV block="加速 %p=variables_get(player) 在%time 秒内加速到 vx %dx vy %dy"
    //%inlineInputMode=inline
    export function acceToV (sprite: Sprite, time: number, vx: number, vy: number) {
        let clock = setInterval(()=>{
            sprite.ax = (vx-sprite.vx)/time
            sprite.ay = (vy-sprite.vy)/time
        }, time*10)
        setTimeout(()=>clearInterval(clock), time*1100)
    }
    
    //%block
    //%group="人物动作"
    //%blockId=run block="起跑 %p=variables_get(player)"
    //%weighr=98
    export function run(p: Character){
        if(p.laspres == 1){
            p.leftdown()
            p.leftup()
            p.leftdown()
            p.leftup()
        }
        else{
            p.rightdown()
            p.rightup()
            p.rightdown()
            p.rightup()
        }
    }

    //%block
    //%group="人物动作"
    //%blockId=newPosture block="近身攻击 %p=variables_get(player) 摆出姿势 %img=screen_image_picker %t 秒 攻击部位(弹射物) %atk=screen_image_picker "
    //%inlineInputMode=inline
    //%t.defl=0.3
    //%weight=97
    //%blockSetVariable="projectile"
    export function newPosture(p: Character, img: Image, t: number, atk: Image){
        p.attack = 1
        p.defence = 0
        p.mySprite.setImage(img.clone())
        p.stop()
        let projectile = p.attackPosture(atk, t*1000)
        projectile.indeflectible = true
        if (p.laspres == 1) {
            p.mySprite.image.flipX()
        }
        setTimeout(()=>{p.stand(true)}, t*1000)
        return projectile
    }

//=================== 人物参数 ===================

    //%block
    //%group="人物参数"
    //%blockId=setPlayerStImage block="设置$p=variables_get(player) %k=stimgKind 姿势 $img=screen_image_picker"
    //%inlineInputMode=inline
    export function setStImage(p: Character, k: stimgKind, img: Image){
        if(k == stimgKind.Defence){
            p.defenceimg = img
        }
        else if(k == stimgKind.Hitover){
            p.hitover = img
        }
        else if(k == stimgKind.Lie){
            p.lieimg = img
        }
    }
    //%block
    //%group="人物参数"
    //%blockId=setPlayerAtkImage block="设置$p=variables_get(player) %k=atkimgKind 姿势 $img=screen_image_picker 攻击部位 %atk=screen_image_picker"
    //%inlineInputMode=inline
    export function setAtkImage(p: Character, k: atkimgKind, img: Image, atk: Image){
        if(k == atkimgKind.hand1)
        {
            p.attackA = img
            p.hand = atk
        }
        else if(k == atkimgKind.hand2)
        {
            p.rushA = img
            p.rushhand = atk
        }else if(k == atkimgKind.leg1)
        {
            p.attackB = img
            p.leg = atk
        }
        else if(k == atkimgKind.leg2)
        {
            p.rushB = img
            p.rushleg = atk
        }
    }

    //%block
    //%group="人物参数"
    //%blockId=setPlayerWalkImage block="设置$p=variables_get(player) %k=aniKind $img=animation_editor ||走路帧间隔%t ms"
    //%inlineInputMode=inline
    //%t.defl=200
    export function setWalkImage(p: Character, k: aniKind, img: Image[], t: number = 200){
        p.walkInterval = t
        if(k == aniKind.Hurt)
        {
            p.hurtedimg = img
        }
        else if(k == aniKind.Walk){
            p.walkimg = img
        }
    }

    //%block
    //%group="人物参数"
    //%blockId=setAbility block="设置%p=variables_get(player) 属性 %k=abilityKind 为 %v"
    //%v.defl=0
    export function setAbility(p: Character, k: abilityKind, v: number){
        if(k == abilityKind.damageA){
            p.damageA = v
        }else if(k == abilityKind.damageB){
            p.damageB = v
        }else if(k == abilityKind.def){
            p.def = v
        }else if(k == abilityKind.defact){
            p.defact = v
        }else if(k == abilityKind.defencelas){
            p.defencelas = v
        }else if(k == abilityKind.downtime){
            p.downtime = v
        }else if(k == abilityKind.hitrecA){
            p.hitrecA = v
        }else if(k == abilityKind.hitrecB){
            p.hitrecB = v
        }else if(k == abilityKind.immutime){
            p.immutime = v
        }else if(k == abilityKind.jumpspeed){
            p.jumpspeed = v
        }else if(k == abilityKind.rushspeed){
            p.rushspeed = v
        }else if(k == abilityKind.walkspeed){
            p.walkspeed = v
        }
    }

//=================== 导出人物 ===================
    //%block
    //%group="导出人物"
    //%blockId=exportCharacter block="导出人物$p=variables_get(player) 命名为%name"
    //%afterOnStart=true
    export function exportCharacter(p: Character, name: string){
        if(playGame.characters == undefined){
            playGame.characters = []
        }
        playGame.characters.push({character: p, name: name})
    }

}