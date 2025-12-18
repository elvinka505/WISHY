/*
Есть массив объектов { title, artist, url }
Каждый вызов fetchSong() возвращает один случайный элемент
нет реального сетевого запроса — просто рандом из списка
 */
export class MusicRecommender {
    constructor() {
        this.songs = [
            { title: "In My Dreams", artist: "Red Velvet", url: "https://open.spotify.com/track/4ubg38wkWizzLsQwLuE6rM" },
            { title: "Lucid Dream", artist: "aespa", url: "https://open.spotify.com/track/285Bh5EkbxGGE76ge8JDbH" },
            { title: "YoYo", artist: "RESCENE", url: "https://open.spotify.com/track/53phXoN9I3xf60c3h2DhIl" },
            { title: "Midnight Fiction", artist: "ILLIT", url: "https://open.spotify.com/track/6QqrxJe1iQxwLY6he6FLFo" },
            { title: "BAHAMA", artist: "aespa", url: "https://open.spotify.com/track/5WSO7bxmmQjk1lqrLDIcTs" },
            { title: "Lucky Girl Syndrome", artist: "ILLIT", url: "https://open.spotify.com/track/2kIUILBPlz4exX9xIFS275" },
            { title: "Feel My Rhythm", artist: "Red Velvet", url: "https://open.spotify.com/track/2oBMZYteeO8DyXV9gDx6Za" },
            { title: "Rewind", artist: "Wonder Girls", url: "https://open.spotify.com/track/2YZa0dsV3xXGZ61XFYiRt8" },
            { title: "Automatic", artist: "Red Velvet", url: "https://open.spotify.com/track/76DhGlPaJ112MHVs1PJMyX" },
            { title: "TTYL", artist: "Loossemble", url: "https://open.spotify.com/track/3AXryyinIY17WLddIcNjwT" },
            { title: "DAHLIA", artist: "(G)I-DLE", url: "https://open.spotify.com/track/2CxgY4VvTNA0bG2nVtmgPg" },
            { title: "Ride Or Die", artist: "KAI", url: "https://open.spotify.com/track/5Ej0A9BOsVSrxYwC6GSfCv" },
            { title: "Doughnut", artist: "TWICE", url: "https://open.spotify.com/track/6YBcbXDYIITuyCEN2YwGRy" },
            { title: "Designer", artist: "NCT 127", url: "https://open.spotify.com/track/4axTxw4EXSVSGm6f6vxTdZ" },
            { title: "Ditto", artist: "NewJeans", url: "https://open.spotify.com/track/3r8RuvgbX9s7ammBn07D3W" },
            { title: "Dopamine", artist: "aespa", url: "https://open.spotify.com/track/6pIuPm3u7QgUFAX1V0D9wY" },
            { title: "Pinball", artist: "RESCENE", url: "https://open.spotify.com/track/7FzDMnwPhj6qdTT2PRaSYi" },
            { title: "Cool With You", artist: "NewJeans", url: "https://open.spotify.com/track/02wk5BttM0QL38ERjLPQJB" },
            { title: "Illusion", artist: "aespa", url: "https://open.spotify.com/track/396FqjKmViUZ92Wmm4rx3i" },
            { title: "Chill Kill", artist: "Red Velvet", url: "https://open.spotify.com/track/18VlcIarBGAEAD9KVt3FmE" },
            { title: "Viola", artist: "Yves", url: "https://open.spotify.com/track/4srk9VdSiPW0IKqeX4KNDb" },
            { title: "Happiness", artist: "Red Velvet", url: "https://open.spotify.com/track/6XP9L7di5JnOc9WaeAW8oe" },
            { title: "Sweet Juice", artist: "PURPLE KISS", url: "https://open.spotify.com/track/2th6UWbfVz3hsSDzQAKqy2" },
            { title: "Better Things", artist: "aespa", url: "https://open.spotify.com/track/330IIz7d75eqAsKq1xhzXR" },
            { title: "LEFT RIGHT", artist: "XG", url: "https://open.spotify.com/track/3v5o91PrUtf0nmO6j8J7dZ" },
            { title: "Perfume", artist: "NCT DOJAEJUNG", url: "https://open.spotify.com/track/0jd4aa9XgV5eom0ez0WBrD" },
            { title: "Kiss", artist: "NCT DOJAEJUNG", url: "https://open.spotify.com/track/6iirdwpyu2Ohg3iVdu4vXl" },
            { title: "Unconditional", artist: "JAEHYUN", url: "https://open.spotify.com/track/4j0W96NZvBFqwIyhCb9uGX" },
            { title: "Flamin' Hot Lemon", artist: "JAEHYUN", url: "https://open.spotify.com/track/63QGnW9l5fJVXejFFdFd2i" },
            { title: "Can't Get You", artist: "JAEHYUN", url: "https://open.spotify.com/track/5rQK8kcBmwVGuJqqzMJApQ" }
        ];
    }

    async fetchSong() {
        return this.songs[Math.floor(Math.random() * this.songs.length)];
    }
}
