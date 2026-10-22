const fs = require('fs');
const { Document, NodeIO } = require('@gltf-transform/core');

async function inspect() {
  const io = new NodeIO();
  const doc = await io.read('public/salvi_gear_v3.glb');

  const nodes = doc.getRoot().listNodes();
  let quarters = 0;
  let accents = 0;
  let labels = 0;
  
  for (const node of nodes) {
    const name = node.getName();
    if (name.match(/^quarter_\d+$/)) quarters++;
    if (name.match(/^quarter_\d+_accent$/)) accents++;
    if (name.match(/^label_\d+$/)) labels++;
  }

  const animations = doc.getRoot().listAnimations();
  let maxDuration = 0;
  for (const anim of animations) {
    for (const sampler of anim.listSamplers()) {
      const input = sampler.getInput();
      if (input) {
        const arr = input.getArray();
        if (arr && arr.length > 0) {
          const duration = arr[arr.length - 1];
          if (duration > maxDuration) maxDuration = duration;
        }
      }
    }
  }

  console.log('Quarters:', quarters);
  console.log('Accents:', accents);
  console.log('Labels:', labels);
  console.log('Max Duration (s):', maxDuration);
}

inspect().catch(console.error);
