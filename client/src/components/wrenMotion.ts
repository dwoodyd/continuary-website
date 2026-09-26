export type WrenMotionState = {
  autoplay: boolean;
  prefersReducedMotion: boolean;
  userPaused: boolean;
  userRequestedPlay: boolean;
};

export type WrenMotionControlState = Pick<WrenMotionState, "userPaused" | "userRequestedPlay">;

/**
 * Automatic looping is suppressed for reduced-motion visitors and after a
 * visitor presses pause. The public marketing site defaults autoplay to false,
 * so a direct Play action is the normal way to load a Wren clip.
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
    // A deliberate play request is the sole opt-in for deferred marketing media
    // and also overrides a reduced-motion default for this one clip.
    userRequestedPlay: true,
  };
}
