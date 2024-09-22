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

    const background = "{{site.baseurl}}/images/rpg/water.png"
    GameControl.start(background);
</script>
