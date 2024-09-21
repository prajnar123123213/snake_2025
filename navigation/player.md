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
    body, html {
        margin: 0;
        padding: 0;
        overflow: hidden;
        width: 100%;
        height: 100%;
    }
</style>

<canvas id='gameCanvas'></canvas>

<script type="module">
    import GameControl from '/john_2025/assets/js/player/GameControl.js';

    GameControl.init();
    GameControl.start();

</script>
