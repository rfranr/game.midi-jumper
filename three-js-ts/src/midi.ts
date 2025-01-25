import { Midi } from "@tonejs/midi";

// simple track

export interface Note {
  midi: number;
  velocity: number;
  noteOffVelocity: number;
  ticks: number;
  durationTicks: number;
  name: string;
}

// Function to load a file from the public directory
async function loadMidiFile(url: string): Promise<Uint8Array> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load ${url}: ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();

  return new Uint8Array(arrayBuffer);
}

// Main function to parse the MIDI file
export async function main(): Promise<{
  notes: Note[];
  ppq: number;
  // other track info
}> {
  const _notes: Note[] = [];

  const midiData = await loadMidiFile("tocatta.mid"); 
  const midi = new Midi(midiData);

  //get the tracks
  midi.tracks.forEach((track) => {
    //tracks have notes and controlChanges

    //notes are an array
    const notes = track.notes;
    notes.forEach((note) => { 
      console.log(note);
      _notes.push({
        midi: note.midi,
        velocity: note.velocity,
        noteOffVelocity: note.noteOffVelocity,
        ticks: note.time,
        durationTicks: note.durationTicks,
        name: note.name,
      } as Note);
      //note.midi, note.time, note.duration, note.name
    });

    //the control changes are an object
    //the keys are the CC number
    //track.controlChanges[64]
    //they are also aliased to the CC number's common name (if it has one)
    //track.controlChanges.sustain.forEach(cc => {
    //  console.log ( cc )
    //
    //  // cc.ticks, cc.value, cc.time
    //})

    //the track also has a channel and instrument
    //track.instrument.name
  });


  return {
    ppq: midi.header.ppq,
    notes: _notes
  };
}
