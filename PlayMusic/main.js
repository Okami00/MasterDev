const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $('.status h2')
const thumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn--toggle')
const player = $('.container')
const process = $('.progress')
const nextBtn = $('.btn--next')
const preBtn = $('.btn--prev')
const randomBtn = $('.btn--random')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    songs: [
        {
            name: 'Anh sợ yêu',
            author: 'Anh Quân Idol',
            path: '/music/AnhSoYeuLo.mp3',
            image: "/images/image.jpeg"
        },
        {
            name: 'Ai đưa em về',
            author: 'Thiện Hiếu',
            path: '/music/AiDuaEmVe.mp3',
            image: '/images/image.jpeg'
        },
        {
            name: 'Bai này chill phết',
            author: 'Đen',
            path: '/music/BaiNayChillPhet.mp3',
            image: '/images/image.jpeg'
        },
        {
            name: 'Cưới đi',
            author: 'Huấn Rose',
            path: '/music/CuoiDi.mp3',
            image: '/images/image.jpeg'
        },
        {
            name: 'Gác lại lo âu',
            author: 'Da Lab',
            path: '/music/GacLaiLoAu.mp3',
            image: '/images/image.jpeg'
        },
        {
            name: 'Nàng thơ',
            author: 'Hoàng Dũng',
            path: '/music/NangTho.mp3',
            image: '/images/image.jpeg'
        },
        {
            name: 'Ngày chưa giông bão',
            author: 'Đạt Chivas',
            path: '/music/NgayChuaGiongBao.mp3',
            image: '/images/image.jpeg'
        }
    ],
    render: function () {
        const htmls = this.songs.map(song => {
            return ` 
            <div class="song">
            <div class="song__image" style=" background-image: url('${song.image}');"></div>
            <div class="song__body">
                <h3 class="song__body--title">${song.name}</h3>
                <p class="song__body--author">${song.author}</p>
            </div>
            <div class="song__option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
            </div>
            `
        })
        $('.playlist').innerHTML = htmls.join('');
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvent: function () {
        const cdWidth = cd.offsetWidth // Lấy ra width của element cd
        // Xử lí CD quay/dừng
        const cdThumbAnimate = thumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000, //10 seconds
            interations: Infinity
        })
        cdThumbAnimate.pause()

        // Xử lí phóng to / thu nhỏ
        document.onscroll = function () {
            const scrollY = window.scrollX || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollY

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }
        // Xử lí khi click play
        playBtn.onclick = function () {
            if (app.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
            // Khi song được play
            audio.onplay = function () {
                app.isPlaying = true
                player.classList.add('playing')
                cdThumbAnimate.play()
            }
            // Khi song bị pause
            audio.onpause = function () {
                app.isPlaying = false
                player.classList.remove('playing')
                cdThumbAnimate.pause()
            }
            // Khi tiến độ bài hát thay đổi
            audio.ontimeupdate = function () {
                if (audio.duration) {
                    const processPercent = Math.floor(audio.currentTime / audio.duration * 100)
                    process.value = processPercent
                }
            }
            // Xử lí khi tua bài hát
            process.onchange = function (e) {
                const seekTime = audio.duration / e.target.value * 100
                audio.currentTime = seekTime
            }
        }
        // Khi next
        nextBtn.onclick = function () {
            if(app.isRandom){
                app.randomSong()
            }else{
                app.nextSong()
            }
            audio.play()
        }
        // Khi prev
        preBtn.onclick = function () {
            if(app.isRandom){
                app.randomSong()
            }else{
                app.prevSong()
            }
            audio.play()
        }
        // Xử lí bật/tắt random
        randomBtn.onclick = function () {
            app.isRandom = !app.isRandom

            randomBtn.classList.toggle('active', app.isRandom)
        }
        // Xử lí song khi audio ended
        audio.onended = function(){
            nextBtn.click()
        }

    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        thumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    randomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        }while (newIndex === this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong()
        
    },
    start: function () {
        // Định nghĩa các thuộc tính cho object
        this.defineProperties()

        // Lắng nghe. xử lí sự kiện DOM events
        this.handleEvent()

        // Load thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong()
        // Render playlist
        this.render()
    }
}
app.start()
