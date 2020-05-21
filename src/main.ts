import moment = require("moment")

/** カウントダウンに指定する時間。24時間表記で（例：午前9時なら9） */
const COUNTDOWN_HOUR = 9

// メイン関数
function main(param: g.GameMainParameterObject): void {
	const scene = new g.Scene({
		game: g.game,
		// このシーンで利用するアセットのIDを列挙し、シーンに通知します
		assetIds: ["countdown"]
	})
	scene.loaded.add(() => {
		// ここからゲーム内容を記述します

		// 四角描画
		const sprite = new g.Sprite({
			scene: scene,
			src: scene.assets["countdown"]
		})
		scene.append(sprite)

		// 文字描画
		const font = new g.DynamicFont({
			game: g.game,
			fontFamily: g.FontFamily.SansSerif,
			size: 30
		})
		const constTextLabel = new g.Label({
			scene: scene,
			font: font,
			text: "午前9時(バックレ)まであと",
			fontSize: 30,
			textColor: "black",
			y: 220,
			x: 20
		})
		scene.append(constTextLabel)

		// カウントダウンタイマー
		const countDownTimeLabel = new g.Label({
			scene: scene,
			font: font,
			text: "12:13:00",
			fontSize: 30,
			textColor: "red",
			y: 260
		})
		countDownTimeLabel.x = (g.game.width - countDownTimeLabel.width) - 20
		scene.append(countDownTimeLabel)

		// カウントダウン進める
		scene.update.add(() => {
			// 時間操作ライブラリ導入。akashic install moment で導入できる
			// TSでも時間がおかしくならないように(Date()#now()はタイムシフトの時間に影響する)
			const time = moment(g.game.getCurrentTime())
			// 次の日の9時に設定する
			const schoolingTime = moment(g.game.getCurrentTime())
			if (time.hour() <= COUNTDOWN_HOUR) {
				// その日から見て９時前なら９時にセットする
				schoolingTime.hour(COUNTDOWN_HOUR).minute(0).second(0).milliseconds(0)
			} else {
				// その日から見て９時を過ぎた時は一日足す
				schoolingTime.add(1, "days").hour(COUNTDOWN_HOUR).minute(0).second(0).milliseconds(0)
			}
			// 差分計算
			const calcMiliSec = schoolingTime.diff(time)
			// HH←これ大文字じゃないとだめだよ(24時間表記にするため)。あとなんか９時間足されてるから引いといた？
			const countDownTime = moment(calcMiliSec).add(-9, "hours").format("HH時間mm分ss.SSS秒")
			// 反映
			countDownTimeLabel.text = `${countDownTime}`
			// 位置ずれ対策
			countDownTimeLabel.x = (g.game.width - countDownTimeLabel.width) - 20
			countDownTimeLabel.invalidate()
		})

		// ここまでゲーム内容を記述します
	})
	g.game.pushScene(scene)
}

export = main
