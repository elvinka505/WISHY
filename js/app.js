import { SoundPlayer } from "./sound.js";
import { MusicRecommender } from "./music.js";

export class WishApp {
    constructor() {
        // DOM
        this.form = document.getElementById("wish-form");
        this.input = document.getElementById("wish-input");
        this.list = document.getElementById("wish-list");
        this.clearDoneBtn = document.getElementById("clear-done");
        this.totalCount = document.getElementById("total-count");
        this.doneCount = document.getElementById("done-count");
        this.badgeText = document.getElementById("badge-text");
        this.themeToggle = document.getElementById("theme-toggle");
        this.progressBar = document.getElementById("progress-bar");
        this.congrats = document.getElementById("congrats-message");
        this.closeCongrats = document.getElementById("close-congrats");

        // K-pop
        this.kpopBtn = document.getElementById("kpop-btn");
        this.kpopSong = document.getElementById("kpop-song");
        this.kpopLink = document.getElementById("kpop-link");

        // main state
        this.key = "wishes";
        this.wishes = JSON.parse(localStorage.getItem(this.key) || "[]");

        // helpers
        this.sound = new SoundPlayer();
        this.recommender = new MusicRecommender();

        // drag
        this.dragIndex = null;

        this.init();
    }

    init() {
        // restore theme
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark");
            this.themeToggle.textContent = "☀️";
        }

        // listeners
        this.form.addEventListener("submit", e => this.addWish(e));
        this.clearDoneBtn.addEventListener("click", () => this.clearDone());
        this.themeToggle.addEventListener("click", () => this.toggleTheme());
        this.closeCongrats.addEventListener("click", () => this.congrats.classList.add("hidden"));
        this.kpopBtn.addEventListener("click", () => this.loadKpop());

        // load saved song
        this.loadLastKpop();

        // render
        this.render();
        this.updateProgress();
    }

    save() {
        localStorage.setItem(this.key, JSON.stringify(this.wishes));
    }

    /* --------------------
       вишлист
    --------------------- */

    addWish(e) {
        e.preventDefault();
        const text = this.input.value.trim();
        if (!text) return;

        this.wishes.unshift({ text, done: false });
        this.save();

        this.input.value = "";
        this.sound.playAdd();
        this.render();
        this.updateProgress();
        this.checkAllDone();
    }

    render() {
        this.list.innerHTML = "";

        this.wishes.forEach((wish, index) => {
            const li = document.createElement("li");
            li.draggable = true;
            li.dataset.index = index;

            const left = document.createElement("div");
            left.className = "left";

            const icon = document.createElement("span");
            icon.textContent = wish.done ? "💖" : "⭐";

            const text = document.createElement("span");
            text.textContent = wish.text;

            left.appendChild(icon);
            left.appendChild(text);
            li.appendChild(left);

            // delete button
            const del = document.createElement("button");
            del.className = "delete-btn";
            del.textContent = "✕";
            del.addEventListener("click", e => {
                e.stopPropagation();
                this.wishes.splice(index, 1);
                this.save();
                this.render();
                this.updateProgress();
            });

            li.appendChild(del);

            // toggle done выполнено или нет
            li.addEventListener("click", () => {
                this.wishes[index].done = !this.wishes[index].done;
                this.save();
                this.render();
                this.updateProgress();
                this.checkAllDone();
            });

            // drag start - кто начал перетаскивать
            li.addEventListener("dragstart", () => {
                li.classList.add("dragging");
                this.dragIndex = index;
            });

            // drag end
            li.addEventListener("dragend", () => {
                li.classList.remove("dragging");
                this.dragIndex = null;
            });

            // drag over
            li.addEventListener("dragover", e => e.preventDefault());

            // drop куда отпустили
            li.addEventListener("drop", e => {
                e.preventDefault();
                const targetIndex = index;
                if (this.dragIndex === null) return;

                const [item] = this.wishes.splice(this.dragIndex, 1);
                this.wishes.splice(targetIndex, 0, item);

                this.save();
                this.render();
            });

            if (wish.done) li.classList.add("finished");

            this.list.appendChild(li);
        });

        this.updateStats();
    }

    updateStats() {
        const total = this.wishes.length;
        const done = this.wishes.filter(w => w.done).length;

        this.totalCount.textContent = `Всего: ${total}`;
        this.doneCount.textContent = `Выполнено: ${done}`;
/*
        if (done >= 20) this.badgeText.textContent = "Королева желаний";
        else if (done >= 10) this.badgeText.textContent = "Про-исполнитель";
        else if (done >= 5) this.badgeText.textContent = "Мотиватор";
        else this.badgeText.textContent = "";

 */
    }

    // прогресс-бар пропорциональный количеству выполненных дел
    updateProgress() {
        const total = this.wishes.length;
        const done = this.wishes.filter(w => w.done).length;
        this.progressBar.style.width = (total ? (done / total) * 100 : 0) + "%";
    }

    // удалить все выполненные желания
    clearDone() {
        this.wishes = this.wishes.filter(w => !w.done);
        this.save();
        this.render();
        this.updateProgress();
    }

    // поздравление, если список не пустой и все completed === true
    checkAllDone() {
        if (this.wishes.length > 0 && this.wishes.every(w => w.done)) {
            this.congrats.classList.remove("hidden");
            confetti({
                particleCount: 200,
                spread: 120,
                origin: { y: 0.4 }
            });
            this.sound.playCelebrate();
        }
    }

    toggleTheme() {
        document.body.classList.toggle("dark");
        const isDark = document.body.classList.contains("dark");
        this.themeToggle.textContent = isDark ? "☀️" : "🌙";
        localStorage.setItem("theme", isDark ? "dark" : "light");
        // сохраняет выбор в localStorage чтобы при следующем запуске восстановить
    }

    /* --------------------
       рекомендации песен
    --------------------- */

    loadKpop() {
        this.kpopSong.textContent = "Загружаю песню… 💗";

        this.recommender.fetchSong().then(song => {
            this.kpopSong.textContent = `🎀 ${song.title} — ${song.artist}`;
            this.kpopLink.href = song.url;
            this.kpopLink.classList.remove("hidden");

            localStorage.setItem("lastKpop", JSON.stringify(song));
        });
    }

    loadLastKpop() {
        const last = JSON.parse(localStorage.getItem("lastKpop") || "null");
        if (!last) return;

        this.kpopSong.textContent = `🎀 ${last.title} — ${last.artist}`;
        this.kpopLink.href = last.url;
        this.kpopLink.classList.remove("hidden");
    }
}
