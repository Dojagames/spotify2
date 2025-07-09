<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useSpotifyStore } from '@/stores/dataStore.ts';

const spotifyStore = useSpotifyStore();

const currentPlaylist = computed(() => spotifyStore.getCurrentPlaylist);

const filterOpen = ref(false);
const addSelectionOpen = ref(false);
const playlistFilters = ref({
  duplicates: false,
  release: {
    after: false,
    before: false
  },
  length: {
    longer: false,
    shorter: false,
  }
});

const allPlaylists = computed(() => {
  return spotifyStore.getAllPlaylists('');
});


function openPlaylist(id: string) {

}

function addSelection(id: string) {

}

function deleteSelection() {

}

function saveCurrentPlaylist() {

}

</script>

<template>
  <div class="absolute top-0 w-full h-[calc(100vh-110px)]">
    <div id="interactivePlaylistEditor">
      <div id="PlaylistEditorPlaylistSelectWrapper" v-if="currentPlaylist == undefined">
        Hier koennte ihre Playlist stehen
      </div>

      <div class="w-full h-full" v-else>
        <div class="h-[200px] w-full relative">
          <div class="h-[168px] w-full">
            <img class="cursor-pointer h-[128px] w-[128px] object-cover rounded-[12px] absolute top-5 left-5" :src="currentPlaylist.playlist.images[0].url" @click="openPlaylist(currentPlaylist.playlist.id)">
            <p v-if="currentPlaylist.playlist.public" class="absolute left-[168px] top-5">public playlist</p>
            <p v-else class="absolute left-[168px] top-5:w">private playlist</p>
            <h2 class="cursor-pointer absolute left-[168px] top-[60px] text-2xl font-bold" @click="openPlaylist(currentPlaylist?.playlist.id)">{{ currentPlaylist.playlist.name }}</h2>
            <h4 class="absolute left-[168px] top-[85px] font[100]" v-if="currentPlaylist?.playlist.description">{{ currentPlaylist.playlist.description }}</h4>
            <h4 class="absolute left-[168px] top-[120px] font[100]">by {{ currentPlaylist.playlist.owner.display_name }} • {{ currentPlaylist.playlist.tracks.total }} songs</h4>
          </div>


          <div id="playlistEditorFilterMenu" v-if='filterOpen==true' @click.self="filterOpen = false">
            <div id="playlistFilterModalInner">
              <p style="position: absolute; right: 15px; top: -5px; font-weight: bold; font-size: large;" @click="filterOpen = false" class="clickable">x</p>
              <h3>Filter by</h3>

              duplicates: <input type="checkbox" v-model="playlistFilters.duplicates"><br>
              release: after <input type="date" v-model="playlistFilters.release.after" style="background-color: transparent; border: none;"> before <input type="date" v-model="playlistFilters.release.before" style="background-color: transparent; border: none;"><br>
              length (in seconds): longer than <input type="text" v-model="playlistFilters.length.longer" style="background-color: transparent; border: 1px solid white; border-radius: 4px;"> shorter then <input type="text" v-model="playlistFilters.length.shorter" style="background-color: transparent; border: 1px solid white; border-radius: 4px;"><br>
            </div>
          </div>
          <!-- <div id="playlistEditorButtons">
            <div id="addplaylistPopup" :class="addSelectionOpen? '' : 'invisible'">
              <div v-for="list in allPlaylists" @click="addSelection(list.id)">
                {{ list.name }}
              </div>
            </div>
            <button @click="addSelectionOpen = !addSelectionOpen" class="playlistEditorButtonsBtns clickable" :style="addSelectionOpen? 'border-color: var(--accentGreen)': ''">add Selection to other Playlist</button>
            <button @click="deleteSelection()" class="playlistEditorButtonsBtns clickable">delete Selection</button>
            <button id="saveBtnPlaylistEditor" @click="saveCurrentPlaylist()" class="clickable playlistEditorButtonsBtns">save Selection</button>
          </div> -->
        </div>









        <div id="PlatlistEditorSectionDevider"></div>

        <div class="overflow-x-hidden overflow-y-auto h-[calc(100vh-110px-200px)] w-full" >
          <div class="flex-nowrap flex" style="padding-bottom: 15px; position: fixed; background: linear-gradient(180deg,#212121 40%, rgba(255, 0, 0, 0) 100%);">
            <div class="platlistEditorLowerSectionContainerLine playlistLineLong" style="color: var(--accentGreen); font-weight: bold;">Name <p v-if="playlistFilterOptions == 'name_a'" @click="playlistFilterOptions = 'name_d'" class="clickable">ʌ</p><p v-else-if="playlistFilterOptions == 'name_d'" @click="playlistFilterOptions = ''" class="clickable" >v</p><p v-else @click="playlistFilterOptions = 'name_a'" class="clickable">-</p> </div>
            <div class="platlistEditorLowerSectionContainerLine playlistLineLong" style="color: var(--accentGreen); font-weight: bold;">Album <p v-if="playlistFilterOptions == 'album_a'" @click="playlistFilterOptions = 'album_d'" class="clickable">ʌ</p><p v-else-if="playlistFilterOptions == 'album_d'" @click="playlistFilterOptions = ''" class="clickable">v</p><p v-else @click="playlistFilterOptions = 'album_a'" class="clickable">-</p> </div>
            <div class="platlistEditorLowerSectionContainerLine playlistLineMediumLong" style="color: var(--accentGreen); font-weight: bold;">Artist <p v-if="playlistFilterOptions == 'artist_a'" @click="playlistFilterOptions = 'artist_d'" class="clickable">ʌ</p><p v-else-if="playlistFilterOptions == 'artist_d'" @click="playlistFilterOptions = ''" class="clickable">v</p><p v-else @click="playlistFilterOptions = 'artist_a'" class="clickable">-</p> </div>
            <div class="platlistEditorLowerSectionContainerLine playlistLineMedium" style="color: var(--accentGreen); font-weight: bold;">Release Date <p v-if="playlistFilterOptions == 'release_a'" @click="playlistFilterOptions = 'release_d'" class="clickable">ʌ</p><p v-else-if="playlistFilterOptions == 'release_d'" @click="playlistFilterOptions = ''" class="clickable">v</p><p v-else @click="playlistFilterOptions = 'release_a'" class="clickable">-</p> </div>
            <div class="platlistEditorLowerSectionContainerLine playlistLineShort" style="color: var(--accentGreen); font-weight: bold;">Length <p v-if="playlistFilterOptions == 'length_a'" @click="playlistFilterOptions = 'length_d'" class="clickable">ʌ</p><p v-else-if="playlistFilterOptions == 'length_d'" @click="playlistFilterOptions = ''" class="clickable">v</p><p v-else @click="playlistFilterOptions = 'length_a'" class="clickable">-</p> </div>
            <div class="platlistEditorLowerSectionContainerLine playlistLineShort" style="color: var(--accentGreen); font-weight: bold;">Popularity <p v-if="playlistFilterOptions == 'pop_a'" @click="playlistFilterOptions = 'pop_d'" class="clickable">ʌ</p><p v-else-if="playlistFilterOptions == 'pop_d'" @click="playlistFilterOptions = ''" class="clickable">v</p><p v-else @click="playlistFilterOptions = 'pop_a'" class="clickable">-</p> </div>
            <div class="platlistEditorLowerSectionContainerLine playlistLineShort" style="color: var(--accentGreen); font-weight: bold;">Random <input type="checkbox"  v-model="playlistSortedRandom" class="PlaylistEditSortingBox clickable" @change="playlistSortedRandom ? playlistFilterOptions = 'random' : playlistFilterOptions = ''" ></div>
            <div class="platlistEditorLowerSectionContainerLine playlistLineShort clickable" style="color: var(--accentGreen); font-weight: bold; text-decoration: underline;" @click="FilterOpen = true">Filter</div>
          </div>
          <div style="margin-bottom: 60px;"></div>
          <div v-for="songs in currentPlaylist?.tracks" class="flex flex-nowrap">
            <div class="platlistEditorLowerSectionContainerLine playlistLineLong" style="cursor: pointer;" @click="AddToQue(songs.track.uri)"> {{ songs.track.name }} </div>
            <div class="platlistEditorLowerSectionContainerLine playlistLineLong"> {{ songs.track.album.name }} </div>
            <div class="platlistEditorLowerSectionContainerLine playlistLineMediumLong"> {{ songs.track.artists[0].name }} </div>
            <div class="platlistEditorLowerSectionContainerLine playlistLineMedium"> {{ songs.track.album.release_date }} </div>
            <div class="platlistEditorLowerSectionContainerLine playlistLineShort"> {{ Math.floor(songs.track.duration_ms / 1000 / 60 % 60).toString().padStart(2, "0") }}:{{ Math.floor(songs.track.duration_ms / 1000 % 60).toString().padStart(2, "0") }} </div>
            <div class="platlistEditorLowerSectionContainerLine playlistLineShort"> {{ songs.track.popularity }} </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.platlistEditorLowerSectionContainerLine{
  overflow: hidden;
  white-space: nowrap;
  margin: 0 0 6px 0;
}
.playlistLineLong{
  width: 355px;
}

.playlistLineShort{
  width: 95px;
}

.playlistLineMediumLong{
  width: 220px;
  padding: 0 5px;
}

.playlistLineMedium{
  width: 160px;
}

</style>
