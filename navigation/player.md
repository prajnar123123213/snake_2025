---
layout: base
title: Player
permalink: /player/
---

<style>
    #canvas {
        margin: 0;
        border: 1px solid white;
    }
</style>

<canvas id='canvas'></canvas>

<script type="module">
    import GameControl from '{{site.baseurl}}/assets/js/player/GameControl.js';

    GameControl.init();
    GameControl.start();

</script>
