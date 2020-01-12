'use strict'
import mapService from '../service/map.service.js'
import tools from './tools.cmp.js'

export default {
    props: ['note'],
    template: `
          <section class="img-note note-container" :style="{'background-color':note.color}">
          <h4>{{note.title}}</h4>
            {{note.info}}
            <div class="map" ref="myMap"></div>
            
          <tools :noteId="note.id" @update="updateNote"></tools>
          </section>
    `,
    data() {
        return {
            map: '',
        };
    },
    methods: {
        updateNote(details) {
            this.$emit('update', details);
        },
        addMarker(loc) {
            var marker = new google.maps.Marker({
                position: loc,
                map: this.map,
                title: 'Hello World!',
            });
            return marker;
        }

    },
    mounted() {
        mapService.initMap()
            .then(() => {
                var lat = this.note.pos.lat
                var lng = this.note.pos.lng
                console.log(lat, lng,this.note.pos);

                console.log('google available');
                this.map = new google.maps.Map(
                    this.$refs.myMap, {
                    center: { lat, lng },
                    zoom: 15
                })
                this.addMarker({ lat, lng })
                // console.log('Map!', map);
            })

    },
    components: {
        tools
    }
};