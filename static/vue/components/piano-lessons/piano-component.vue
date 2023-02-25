<template>
    <div>
        <button @click="start" style="position:absolute; right:50px; bottom: 50px; z-index: 100;">Start</button>
        <button @click="pause" style="position:absolute; right:50px; bottom: 30px; z-index: 100;">Pause</button>

        <div class="notes">
            <div v-for="(beat, index) in golden_hour" :key="index" style="position:absolute; height:20px; width:100%; transition: bottom 0.18s; transition-timing-function: linear;" :style="{bottom: (index * 20 - (song_index * 20)) + 'px'}">
                <div v-for="(note, note_index) in beat" :key="note_index + 'note'" style="background-color:blue; position:absolute; height:20px; top: 0;" :style="[notes[note.note + note.octave].color == 'white' ? {width:'20px'}:{width:'10px'}, {'left': notes[note.note + note.octave].position}]"></div>
            </div>
        </div>


        <div class="piano">
            <span v-for="note_key in Object.keys(notes)" :key="note_key" class="key" :class=" notes[note_key].color == 'white' ? 'whitekey':'blackkey'" :style="[notes[note_key].active > 0 ? {'background-color': 'blue'}:{}, {left: notes[note_key].position }] "></span>
        </div>
    </div>
</template>

<script>
module.exports = {
    components: {
        'piano': httpVueLoader("/static/vue/components/piano-lessons/piano-component.vue")
    },
    props: [],
  	data() {
    	return {
            piano: null,
            piano2: null,
            notes: {
                'A1' : {color:'white', octave: 1, note: 'A', active:0, position: '0px'},
                'A#1' : {color:'black', octave: 1, note: 'A#', active:0, position: '15px'},
                'B1' : {color:'white', octave: 1, note: 'B', active:0, position: '20px'},
                'C2' : {color:'white', octave: 1, note: 'C', active:0, position: '40px'},
                'C#2' : {color:'black', octave: 1, note: 'C#', active:0, position: '55px'},
                'D2' : {color:'white', octave: 1, note: 'D', active:0, position: '60px'},
                'D#2' : {color:'black', octave: 1, note: 'D#', active:0, position: '75px'},
                'E2' : {color:'white', octave: 1, note: 'E', active:0, position: '80px'},
                'F2' : {color:'white', octave: 1, note: 'F', active:0, position: '100px'},
                'F#2' : {color:'black', octave: 1, note: 'F#', active:0, position: '115px'},
                'G2' : {color:'white', octave: 1, note: 'G', active:0, position: '120px'},
                'G#2' : {color:'black', octave: 1, note: 'G#', active:0, position: '135px'},
                'A2' : {color:'white', octave: 2, note: 'A', active:0, position: '140px'},
                'A#2' : {color:'black', octave: 2, note: 'A#', active:0, position: '155px'},
                'B2' : {color:'white', octave: 2, note: 'B', active:0, position: '160px'},
                'C3' : {color:'white', octave: 2, note: 'C', active:0, position: '180px'},
                'C#3' : {color:'black', octave: 2, note: 'C#', active:0, position: '195px'},
                'D3' : {color:'white', octave: 2, note: 'D', active:0, position: '200px'},
                'D#3' : {color:'black', octave: 2, note: 'D#', active:0, position: '215px'},
                'E3' : {color:'white', octave: 2, note: 'E', active:0, position: '220px'},
                'F3' : {color:'white', octave: 2, note: 'F', active:0, position: '240px'},
                'F#3' : {color:'black', octave: 2, note: 'F#', active:0, position: '255px'},
                'G3' : {color:'white', octave: 2, note: 'G', active:0, position: '260px'},
                'G#3' : {color:'black', octave: 2, note: 'G#', active:0, position: '275px'},
                'A3' : {color:'white', octave: 3, note: 'A', active:0, position: '280px'},
                'A#3' : {color:'black', octave: 3, note: 'A#', active:0, position: '295px'},
                'B3' : {color:'white', octave: 3, note: 'B', active:0, position: '300px'},
                'C4' : {color:'white', octave: 3, note: 'C', active:0, position: '320px'},
                'C#4' : {color:'black', octave: 3, note: 'C#', active:0, position: '335px'},
                'D4' : {color:'white', octave: 3, note: 'D', active:0, position: '340px'},
                'D#4' : {color:'black', octave: 3, note: 'D#', active:0, position: '355px'},
                'E4' : {color:'white', octave: 3, note: 'E', active:0, position: '360px'},
                'F4' : {color:'white', octave: 3, note: 'F', active:0, position: '380px'},
                'F#4' : {color:'black', octave: 3, note: 'F#', active:0, position: '395px'},
                'G4' : {color:'white', octave: 3, note: 'G', active:0, position: '400px'},
                'G#4' : {color:'black', octave: 3, note: 'G#', active:0, position: '415px'},
                'A4' : {color:'white', octave: 4, note: 'A', active:0, position: '420px'},
                'A#4' : {color:'black', octave: 4, note: 'A#', active:0, position: '435px'},
                'B4' : {color:'white', octave: 4, note: 'B', active:0, position: '440px'},
                'C5' : {color:'white', octave: 4, note: 'C', active:0, position: '460px'},
                'C#5' : {color:'black', octave: 4, note: 'C#', active:0, position: '475px'},
                'D5' : {color:'white', octave: 4, note: 'D', active:0, position: '480px'},
                'D#5' : {color:'black', octave: 4, note: 'D#', active:0, position: '495px'},
                'E5' : {color:'white', octave: 4, note: 'E', active:0, position: '500px'},
                'F5' : {color:'white', octave: 4, note: 'F', active:0, position: '520px'},
                'F#5' : {color:'black', octave: 4, note: 'F#', active:0, position: '535px'},
                'G5' : {color:'white', octave: 4, note: 'G', active:0, position: '540px'},
                'G#5' : {color:'black', octave: 4, note: 'G#', active:0, position: '555px'},
                'A5' : {color:'white', octave: 5, note: 'A', active:0, position: '560px'},
                'A#5' : {color:'black', octave: 5, note: 'A#', active:0, position: '575px'},
                'B5' : {color:'white', octave: 5, note: 'B', active:0, position: '580px'},
                'C6' : {color:'white', octave: 5, note: 'C', active:0, position: '600px'},
                'C#6' : {color:'black', octave: 5, note: 'C#', active:0, position: '615px'},
                'D6' : {color:'white', octave: 5, note: 'D', active:0, position: '620px'},
                'D#6' : {color:'black', octave: 5, note: 'D#', active:0, position: '635px'},
                'E6' : {color:'white', octave: 5, note: 'E', active:0, position: '640px'},
                'F6' : {color:'white', octave: 5, note: 'F', active:0, position: '660px'},
                'F#6' : {color:'black', octave: 5, note: 'F#', active:0, position: '675px'},
                'G6' : {color:'white', octave: 5, note: 'G', active:0, position: '680px'},
                'G#6' : {color:'black', octave: 5, note: 'G#', active:0, position: '695px'},
                'A6' : {color:'white', octave: 6, note: 'A', active:0, position: '700px'},
                'A#6' : {color:'black', octave: 6, note: 'A#', active:0, position: '715px'},
                'B6' : {color:'white', octave: 6, note: 'B', active:0, position: '720px'},
                'C7' : {color:'white', octave: 6, note: 'C', active:0, position: '740px'},
                'C#7' : {color:'black', octave: 6, note: 'C#', active:0, position: '755px'},
                'D7' : {color:'white', octave: 6, note: 'D', active:0, position: '760px'},
                'D#7' : {color:'black', octave: 6, note: 'D#', active:0, position: '775px'},
                'E7' : {color:'white', octave: 6, note: 'E', active:0, position: '780px'},
                'F7' : {color:'white', octave: 6, note: 'F', active:0, position: '800px'},
                'F#7' : {color:'black', octave: 6, note: 'F#', active:0, position: '815px'},
                'G7' : {color:'white', octave: 6, note: 'G', active:0, position: '820px'},
                'G#7' : {color:'black', octave: 6, note: 'G#', active:0, position: '835px'},
                'A7' : {color:'white', octave: 7, note: 'A', active:0, position: '840px'},
                'A#7' : {color:'black', octave: 7, note: 'A#', active:0, position: '855px'},
                'B7' : {color:'white', octave: 7, note: 'B', active:0, position: '860px'},
                'C8' : {color:'white', octave: 7, note: 'C', active:0, position: '880px'},

            },
            jingle_bells: [
                [{note: 'E', octave: '4', duration: 0.45}],
                [{note: 'E', octave: '4', duration: 0.45}],
                [{note: 'E', octave: '4', duration: 0.9}],
                [null],
                [{note: 'E', octave: '4', duration: 0.45}],
                [{note: 'E', octave: '4', duration: 0.45}],
                [{note: 'E', octave: '4', duration: 0.9}],
                [null],
                [{note: 'E', octave: '4', duration: 0.45}],
                [{note: 'G', octave: '4', duration: 0.45}],
                [{note: 'C', octave: '4', duration: 0.45}],
                [{note: 'D', octave: '4', duration: 0.45}],
                [{note: 'E', octave: '4', duration: 2.0}],
                [null],
                [null],
                [null],
            ],
            golden_hour: [
                [{note: 'A', octave: '4', duration: 2.0}, {note: 'F#', octave: '5', duration: 2.0}],
                [{note: 'C#', octave: '5', duration: 2.0}, {note: 'G#', octave: '5', duration: 2.0}],
                [{note: 'E', octave: '5', duration: 2.0}, {note: 'B', octave: '5', duration: 2.0}],
                [{note: 'C#', octave: '5', duration: 2.0}, {note: 'C#', octave: '6', duration: 2.0}],
                [{note: 'E', octave: '5', duration: 2.0}, {note: 'B', octave: '5', duration: 2.0}],
                [{note: 'C#', octave: '5', duration: 2.0}, {note: 'G#', octave: '5', duration: 2.0}],

                [{note: 'A', octave: '4', duration: 2.0}, {note: 'F#', octave: '5', duration: 2.0}],
                [{note: 'C#', octave: '5', duration: 2.0}, {note: 'G#', octave: '5', duration: 2.0}],
                [{note: 'E', octave: '5', duration: 2.0}, {note: 'B', octave: '5', duration: 2.0}],
                [{note: 'C#', octave: '5', duration: 2.0}, {note: 'C#', octave: '6', duration: 2.0}],
                [{note: 'E', octave: '5', duration: 2.0}, {note: 'B', octave: '5', duration: 2.0}],
                [{note: 'C#', octave: '5', duration: 2.0}, {note: 'G#', octave: '5', duration: 2.0}],

                [{note: 'A', octave: '4', duration: 2.0}, {note: 'F#', octave: '5', duration: 2.0}],
                [{note: 'C#', octave: '5', duration: 2.0}, {note: 'G#', octave: '5', duration: 2.0}],
                [{note: 'E', octave: '5', duration: 2.0}, {note: 'B', octave: '5', duration: 2.0}],
                [{note: 'C#', octave: '5', duration: 2.0}, {note: 'C#', octave: '6', duration: 2.0}],
                [{note: 'E', octave: '5', duration: 2.0}, {note: 'B', octave: '5', duration: 2.0}],
                [{note: 'C#', octave: '5', duration: 2.0}, {note: 'G#', octave: '5', duration: 2.0}],

                [{note: 'A', octave: '4', duration: 2.0}, {note: 'F#', octave: '5', duration: 2.0}],
                [{note: 'C#', octave: '5', duration: 2.0}, {note: 'G#', octave: '5', duration: 2.0}],
                [{note: 'E', octave: '5', duration: 2.0}, {note: 'B', octave: '5', duration: 2.0}],
                [{note: 'C#', octave: '5', duration: 2.0}, {note: 'C#', octave: '6', duration: 2.0}],
                [{note: 'E', octave: '5', duration: 2.0}, {note: 'B', octave: '5', duration: 2.0}],
                [{note: 'C#', octave: '5', duration: 2.0}, {note: 'G#', octave: '5', duration: 2.0}],


                [{note: 'G#', octave: '4', duration: 2.0}, {note: 'E', octave: '5', duration: 2.0}],
                [{note: 'B', octave: '4', duration: 2.0}, {note: 'G#', octave: '5', duration: 2.0}],
                [{note: 'D#', octave: '5', duration: 2.0}, {note: 'B', octave: '5', duration: 2.0}],
                [{note: 'B', octave: '4', duration: 2.0}, {note: 'C#', octave: '6', duration: 2.0}],
                [{note: 'D#', octave: '5', duration: 2.0}, {note: 'B', octave: '5', duration: 2.0}],
                [{note: 'B', octave: '4', duration: 2.0}, {note: 'G#', octave: '5', duration: 2.0}],

                [{note: 'G#', octave: '4', duration: 2.0}, {note: 'E', octave: '5', duration: 2.0}],
                [{note: 'B', octave: '4', duration: 2.0}, {note: 'G#', octave: '5', duration: 2.0}],
                [{note: 'D#', octave: '5', duration: 2.0}, {note: 'B', octave: '5', duration: 2.0}],
                [{note: 'B', octave: '4', duration: 2.0}, {note: 'C#', octave: '6', duration: 2.0}],
                [{note: 'D#', octave: '5', duration: 2.0}, {note: 'B', octave: '5', duration: 2.0}],
                [{note: 'B', octave: '4', duration: 2.0}, {note: 'G#', octave: '5', duration: 2.0}],

                [{note: 'G#', octave: '4', duration: 2.0}, {note: 'E', octave: '5', duration: 2.0}],
                [{note: 'B', octave: '4', duration: 2.0}, {note: 'G#', octave: '5', duration: 2.0}],
                [{note: 'D#', octave: '5', duration: 2.0}, {note: 'B', octave: '5', duration: 2.0}],
                [{note: 'B', octave: '4', duration: 2.0}, {note: 'C#', octave: '6', duration: 2.0}],
                [{note: 'D#', octave: '5', duration: 2.0}, {note: 'B', octave: '5', duration: 2.0}],
                [{note: 'B', octave: '4', duration: 2.0}, {note: 'G#', octave: '5', duration: 2.0}],

                [{note: 'G#', octave: '4', duration: 2.0}, {note: 'E', octave: '5', duration: 2.0}],
                [{note: 'B', octave: '4', duration: 2.0}, {note: 'G#', octave: '5', duration: 2.0}],
                [{note: 'D#', octave: '5', duration: 2.0}, {note: 'B', octave: '5', duration: 2.0}],
                [{note: 'B', octave: '4', duration: 2.0}, {note: 'C#', octave: '6', duration: 2.0}],
                [{note: 'D#', octave: '5', duration: 2.0}, {note: 'B', octave: '5', duration: 2.0}],
                [{note: 'B', octave: '4', duration: 2.0}, {note: 'G', octave: '5', duration: 2.0}],



                [{note: 'F#', octave: '4', duration: 2.0}, {note: 'E', octave: '5', duration: 2.0}],
                [{note: 'A', octave: '4', duration: 2.0}, {note: 'F#', octave: '5', duration: 2.0}],
                [{note: 'C#', octave: '5', duration: 2.0}, {note: 'A', octave: '5', duration: 2.0}],
                [{note: 'A', octave: '4', duration: 2.0}, {note: 'B', octave: '5', duration: 2.0}],
                [{note: 'C#', octave: '5', duration: 2.0}, {note: 'A', octave: '5', duration: 2.0}],
                [{note: 'A', octave: '4', duration: 2.0}, {note: 'F#', octave: '5', duration: 2.0}],

                [{note: 'F#', octave: '4', duration: 2.0}, {note: 'E', octave: '5', duration: 2.0}],
                [{note: 'A', octave: '4', duration: 2.0}, {note: 'F#', octave: '5', duration: 2.0}],
                [{note: 'C#', octave: '5', duration: 2.0}, {note: 'A', octave: '5', duration: 2.0}],
                [{note: 'A', octave: '4', duration: 2.0}, {note: 'B', octave: '5', duration: 2.0}],
                [{note: 'C#', octave: '5', duration: 2.0}, {note: 'A', octave: '5', duration: 2.0}],
                [{note: 'A', octave: '4', duration: 2.0}, {note: 'F#', octave: '5', duration: 2.0}],

                [{note: 'F#', octave: '4', duration: 2.0}, {note: 'E', octave: '5', duration: 2.0}],
                [{note: 'A', octave: '4', duration: 2.0}, {note: 'F#', octave: '5', duration: 2.0}],
                [{note: 'C#', octave: '5', duration: 2.0}, {note: 'A', octave: '5', duration: 2.0}],
                [{note: 'A', octave: '4', duration: 2.0}, {note: 'B', octave: '5', duration: 2.0}],
                [{note: 'C#', octave: '5', duration: 2.0}, {note: 'A', octave: '5', duration: 2.0}],
                [{note: 'A', octave: '4', duration: 2.0}, {note: 'F#', octave: '5', duration: 2.0}],

                [{note: 'F#', octave: '4', duration: 2.0}, {note: 'E', octave: '5', duration: 2.0}],
                [{note: 'A', octave: '4', duration: 2.0}, {note: 'F#', octave: '5', duration: 2.0}],
                [{note: 'C#', octave: '5', duration: 2.0}, {note: 'A', octave: '5', duration: 2.0}],
                [{note: 'A', octave: '4', duration: 2.0}, {note: 'B', octave: '5', duration: 2.0}],
                [{note: 'C#', octave: '5', duration: 2.0}, {note: 'A', octave: '5', duration: 2.0}],
                [{note: 'A', octave: '4', duration: 2.0}, {note: 'F#', octave: '5', duration: 2.0}],



                [{note: 'E', octave: '4', duration: 2.0}, {note: 'D#', octave: '5', duration: 2.0}],
                [{note: 'G#', octave: '4', duration: 2.0}, {note: 'E', octave: '5', duration: 2.0}],
                [{note: 'B', octave: '4', duration: 2.0}, {note: 'F#', octave: '5', duration: 2.0}],
                [{note: 'G#', octave: '4', duration: 2.0}, {note: 'G#', octave: '5', duration: 2.0}],
                [{note: 'B', octave: '4', duration: 2.0}, {note: 'F#', octave: '5', duration: 2.0}],
                [{note: 'G#', octave: '4', duration: 2.0}, {note: 'E', octave: '5', duration: 2.0}],

                [{note: 'E', octave: '4', duration: 2.0}, {note: 'D#', octave: '5', duration: 2.0}],
                [{note: 'G#', octave: '4', duration: 2.0}, {note: 'E', octave: '5', duration: 2.0}],
                [{note: 'B', octave: '4', duration: 2.0}, {note: 'F#', octave: '5', duration: 2.0}],
                [{note: 'G#', octave: '4', duration: 2.0}, {note: 'G#', octave: '5', duration: 2.0}],
                [{note: 'B', octave: '4', duration: 2.0}, {note: 'F#', octave: '5', duration: 2.0}],
                [{note: 'G#', octave: '4', duration: 2.0}, {note: 'E', octave: '5', duration: 2.0}],

                [{note: 'E', octave: '4', duration: 2.0}, {note: 'D#', octave: '5', duration: 2.0}],
                [{note: 'G#', octave: '4', duration: 2.0}, {note: 'E', octave: '5', duration: 2.0}],
                [{note: 'B', octave: '4', duration: 2.0}, {note: 'F#', octave: '5', duration: 2.0}],
                [{note: 'G#', octave: '4', duration: 2.0}, {note: 'G#', octave: '5', duration: 2.0}],
                [{note: 'B', octave: '4', duration: 2.0}, {note: 'F#', octave: '5', duration: 2.0}],
                [{note: 'G#', octave: '4', duration: 2.0}, {note: 'E', octave: '5', duration: 2.0}],

                [{note: 'E', octave: '4', duration: 2.0}, {note: 'D#', octave: '5', duration: 2.0}],
                [{note: 'G#', octave: '4', duration: 2.0}, {note: 'E', octave: '5', duration: 2.0}],
                [{note: 'B', octave: '4', duration: 2.0}, {note: 'F#', octave: '5', duration: 2.0}],
                [{note: 'G#', octave: '4', duration: 2.0}, {note: 'G#', octave: '5', duration: 2.0}],
                [{note: 'B', octave: '4', duration: 2.0}, {note: 'F#', octave: '5', duration: 2.0}],
                [{note: 'G#', octave: '4', duration: 2.0}, {note: 'E', octave: '5', duration: 2.0}],
            ],
            song_index:0,
            player:null,
            audio_context: null,
            oscilator: null,
            pause_trigger: false,
            is_paused: false,

        }
    },
    methods: {
        play(note, octave, duration) {
            var note_key = note + octave
            this.notes[note_key].active += 1
            // console.log(note + octave)
            this.piano.triggerAttackRelease([note + octave], duration);
            // this.piano.play(note, octave, duration); //
            setTimeout(()=> {this.notes[note_key].active -= 1}, duration * 100)
            // this.piano.play('E', 4, 2); //
            // console.log(this.piano)
        },
        start() {
            // this.audio_context = new (window.AudioContext || window.webkitAudioContext)()
            // this.oscilator = this.audio_context.createOscillator();
            if (!this.is_paused) {
                this.song_index = 0
            }
            if (this.player) {
                clearInterval(this.player)
            }
            this.player = setInterval(this.play_golden_hour, 180)
            this.is_paused = false
        },
        pause() {
            this.pause_trigger = true
        },
        play_golden_hour() {
            if (this.pause_trigger) {
                clearInterval(this.player)
                this.is_paused = true
                this.pause_trigger = false
            } 

            that = this
            this.golden_hour[this.song_index].forEach(note => {
                if (note != null) {
                    that.play(note.note, note.octave, note.duration)
                }
            })
            // note = this.golden_hour[this.song_index][1]
            // if (note != null) {
            //     that.play(note.note, note.octave, note.duration)
            // }
            // note2 = this.golden_hour[this.song_index][0]
            // if (note != null) {
            //     that.play2(note.note, note.octave, note.duration)
            // }
            if (this.song_index == this.golden_hour.length - 1) {
                // clearInterval(this.player)
                this.song_index = 0
            } else {
                this.song_index++;
            }
        }

    },
    beforeDestroy() {
        clearInterval(this.player)
    },
//     function noteDurationToMs (bpm, dur, type) {
//     return 60000 * 4 * dur * type / bpm
// }

// function scheduleNote(ac, time, dur) {
//     var osc = ac.createOscillator();
//     osc.connect( ac.destination );
//     osc.start(time);
//     osc.stop(time + dur);
// }

// const ac = new AudioContext();
// let lastNote= ac.currentTime;
// const step = noteDurationToMs(120, 1 / 4, 1) / 1000;
// const lookAhead = step / 2;

// let id, timer = ()=> {
//   const diff = ac.currentTime - lastNote;
//   if (diff >= lookAhead) {
//    const nextNote = lastNote + step;
//    scheduleNote(ac, nextNote, 0.025)
//    lastNote = nextNote;
//   }
// }
// a.addEventListener('click', () => {
//     ac.resume();
//     id = setInterval(timer, 15)
// })
// b.addEventListener('click', () => clearInterval(id))
    mounted() {
         this.piano = new Tone.Sampler({
			urls: {
				A0: "A0.mp3",
				C1: "C1.mp3",
				"D#1": "Ds1.mp3",
				"F#1": "Fs1.mp3",
				A1: "A1.mp3",
				C2: "C2.mp3",
				"D#2": "Ds2.mp3",
				"F#2": "Fs2.mp3",
				A2: "A2.mp3",
				C3: "C3.mp3",
				"D#3": "Ds3.mp3",
				"F#3": "Fs3.mp3",
				A3: "A3.mp3",
				C4: "C4.mp3",
				"D#4": "Ds4.mp3",
				"F#4": "Fs4.mp3",
				A4: "A4.mp3",
				C5: "C5.mp3",
				"D#5": "Ds5.mp3",
				"F#5": "Fs5.mp3",
				A5: "A5.mp3",
				C6: "C6.mp3",
				"D#6": "Ds6.mp3",
				"F#6": "Fs6.mp3",
				A6: "A6.mp3",
				C7: "C7.mp3",
				"D#7": "Ds7.mp3",
				"F#7": "Fs7.mp3",
				A7: "A7.mp3",
				C8: "C8.mp3"
			},
			release: 1,
			baseUrl: "https://tonejs.github.io/audio/salamander/",
            onload: () => {
                // sampler.triggerAttackRelease(["C1", "E1", "G1", "B1"], 0.5);
            }
    }).toDestination();
        // this.piano = Synth.createInstrument('piano');
    },
    computed: {

    }
}

</script>   

<style>
.piano {
    position:absolute;
    bottom:0px;
    left:0;
    right:0;
    height:100px;

}
.notes {
    position:absolute;
    top:50px;
    bottom:100px;
    left:0;
    right:0;
    overflow:hidden;
}
.key {
    position:absolute;
    top:0;
}
.blackkey {
    width:10px;
    height:50px;
    background-color:black;
    display:inline-block;
    border:grey solid 1px;
    z-index:10;
}
.whitekey {
    width:20px;
    height:100px;
    background-color:white;
    display:inline-block;
    border:grey solid 1px;
}
</style>