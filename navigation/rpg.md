---
layout: base
title: RPG
permalink: /rpg/
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
    import GameControl from '{{site.baseurl}}/assets/js/rpg/GameControl.js';

    // Game data
    const background = "{{site.baseurl}}/images/rpg/water.png";
    const sprite_src = "{{site.baseurl}}/images/rpg/turtle.png";
    const sprite_data = {
        pixels: {height: 280, width: 256},
        orientation: {rows: 4, columns: 3 },
        front: {row: 0, start: 0, images: 3 },
        left: {row: 1, start: 0, images: 3 },
        right: {row: 2, start: 0, images: 3 },
        back: {row: 3, start: 0, images: 3 },
    };
    const sprite = {src: sprite_src, data: sprite_data};

    // Game engine
    GameControl.start(background, sprite);
</script>
