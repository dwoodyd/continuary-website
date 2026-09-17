export type WrenMotionState = {
  autoplay: boolean;
  prefersReducedMotion: boolean;
  userPaused: boolean;
  userRequestedPlay: boolean;
};

export type WrenMotionControlState = Pick<WrenMotionState, "userPaused" | "userRequestedPlay">;

/**
 * Automatic looping is suppressed for reduced-motion visitors and after a
 * visitor presses pause. A direct Play action always remains available.
 */
export function shouldPlayWrenMotion({
  autoplay,
  prefersReducedMotion,
  userPaused,
  userRequestedPlay,
}: WrenMotionState): boolean {
  if (userPaused) return false;
  if (userRequestedPlay) return true;
  return autoplay && !prefersReducedMotion;
}

/** Returns the new motion state after the accessible Play/Pause control is pressed. */
export function toggleWrenMotion({
  isPlaying,
  prefersReducedMotion,
}: Pick<WrenMotionState, "prefersReducedMotion"> & { isPlaying: boolean }): WrenMotionControlState {
  if (isPlaying) {
    return { userPaused: true, userRequestedPlay: false };
  }

  return {
    userPaused: false,
    // A deliberate play request overrides a reduced-motion default only for this clip.
    userRequestedPlay: prefersReducedMotion,
  };
}
