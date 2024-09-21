---
layout: base
title: Player
permalink: /player/
---

<style>
    #gameCanvas {
        margin: 0;
        border: 1px solid white;
        display: block;
    }
</style>

<canvas id='gameCanvas'></canvas>

<script type="module">
    import GameControl from '{{site.baseurl}}/assets/js/player/GameControl.js';

    GameControl.start();

</script>
