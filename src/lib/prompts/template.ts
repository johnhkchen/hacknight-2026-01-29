/**
 * WAN Prompt Template Pattern for TimeLens
 *
 * This module documents the standardized prompt structure used for WAN video generation
 * and provides a builder utility for creating new prompts that follow the established pattern.
 *
 * ## Style Guide for Effective WAN Historical Footage Prompts
 *
 * WAN produces best results with prompts that paint a complete visual picture while
 * remaining grounded in authentic period details. The model responds well to concrete
 * specifics rather than abstract descriptions, so "men in rough work clothes and
 * wide-brimmed hats" works better than "workers from the era."
 *
 * Every prompt follows a six-part structure that flows from setting to style. The
 * structure ensures consistency across all generated videos while allowing each era's
 * unique character to shine through. Think of it as building a scene layer by layer:
 * first you establish where and when, then you fill in the visual details, add the
 * people and their activities, set the atmospheric mood, describe how the camera moves
 * through the scene, and finally specify the visual treatment.
 *
 * ### Part 1: Scene Setting
 *
 * Open with the location and time period stated explicitly, then immediately add
 * era-specific physical details that anchor the viewer in that moment. The opening
 * phrase should work like an establishing shot in film, giving the audience their
 * bearings before diving into specifics.
 *
 * Good: "San Francisco waterfront in 1850, wooden docks extending into the bay"
 * Good: "Alcatraz Island during the 1969 Native American occupation"
 * Avoid: "A historical scene at Fisherman's Wharf" (too vague, no temporal anchor)
 *
 * ### Part 2: Visual Details
 *
 * Layer in the physical elements that make the era visually distinctive. Focus on
 * architecture, vehicles, technology, signage, and objects that would actually be
 * present. Research accuracy matters here because anachronisms break immersion.
 *
 * Good: "tall-masted sailing ships anchored offshore" (1850s)
 * Good: "Italian fishing boats called feluccas with lateen sails" (1910s)
 * Good: "tepees set up on the parade ground" (1969 occupation)
 * Avoid: Generic descriptions like "old buildings" or "period vehicles"
 *
 * ### Part 3: Human Activity
 *
 * People bring scenes to life. Describe what they're wearing using period-accurate
 * clothing terms, and show them actively doing something rather than just standing
 * around. The activities should be authentic to the era and location.
 *
 * Good: "men in rough work clothes and wide-brimmed hats unloading cargo crates"
 * Good: "hippies gathered on the Polo Fields, colorful tie-dye clothing"
 * Good: "activists gathered on the dock with painted signs reading 'Indians Welcome'"
 * Avoid: "People walking around" (too generic, no period character)
 *
 * ### Part 4: Atmospheric Elements
 *
 * Set the mood through weather, lighting, time of day, and ambient details like
 * sounds implied visually. San Francisco's fog is almost a character itself and
 * appears frequently in these prompts. Golden hour lighting adds warmth while
 * overcast skies can emphasize certain moods.
 *
 * Good: "morning fog lifting to reveal blue sky, seagulls circling overhead"
 * Good: "muted colors and overcast sky" (for the gritty 1970s freeway era)
 * Good: "electric lights beginning to glow at dusk" (1894 World's Fair wonder)
 *
 * ### Part 5: Camera Movement
 *
 * Specify how the virtual camera moves through the scene. WAN responds well to
 * cinematographic terminology. The movement should serve the content: slow pans
 * for landscapes, tracking shots for bustling streets, static shots for ominous
 * locations, steadicam for immersive walks through crowds.
 *
 * Good: "Slow panning shot across the bustling harbor"
 * Good: "Ominous tracking shot approaching the prison dock"
 * Good: "Steadicam shot weaving through the market crowd"
 * Good: "Sweeping aerial-style shot over the peaceful gathering"
 * Avoid: Just saying "camera moves" without specifying how
 *
 * ### Part 6: Visual Style Directive
 *
 * End with the film treatment that sells the period authenticity. Reference
 * specific film styles, color treatments, and quality characteristics. This is
 * where you invoke the look of archival footage, newsreels, or documentary styles.
 *
 * Good: "Vintage daguerreotype photography style brought to life, sepia tones"
 * Good: "Early cinema documentary style, black and white with slight sepia tint"
 * Good: "Noir documentary style, high contrast black and white, foreboding atmosphere"
 * Good: "Late 1960s news footage style, grainy film quality"
 * Good: "Contemporary travel documentary style, vibrant colors, cinematic quality"
 *
 * For older eras, lean into the visual limitations of that period's actual recording
 * technology even though these are simulated. A prompt for 1850 should evoke
 * daguerreotypes while 1940s Alcatraz should feel like noir photography.
 */

/**
 * The six structural components of a WAN prompt for historical footage.
 * Each field maps to one part of the prompt pattern described in the style guide.
 */
export interface WanPromptComponents {
	/** Location and time period with era-specific physical anchors */
	sceneSetting: string;

	/** Architecture, vehicles, objects, and technology authentic to the era */
	visualDetails: string;

	/** People in period clothing actively engaged in era-appropriate activities */
	humanActivity: string;

	/** Weather, lighting, time of day, and ambient mood elements */
	atmosphere: string;

	/** Cinematographic camera movement description */
	cameraMovement: string;

	/** Film style, color treatment, and quality characteristics */
	styleDirective: string;
}

/**
 * Builds a complete WAN prompt from structured components.
 *
 * The builder concatenates the six parts into a single flowing prompt string,
 * handling punctuation and spacing automatically. Each component should be
 * written as a descriptive phrase without terminal punctuation since the
 * builder manages sentence structure.
 *
 * @example
 * ```ts
 * const prompt = buildWanPrompt({
 *   sceneSetting: "San Francisco waterfront in 1850, wooden docks extending into the bay",
 *   visualDetails: "tall-masted sailing ships anchored offshore",
 *   humanActivity: "men in rough work clothes and wide-brimmed hats unloading cargo crates",
 *   atmosphere: "morning fog lifting to reveal blue sky, seagulls circling overhead",
 *   cameraMovement: "Slow panning shot across the bustling harbor",
 *   styleDirective: "Vintage daguerreotype photography style brought to life, sepia tones, slight film grain"
 * });
 * ```
 */
export function buildWanPrompt(components: WanPromptComponents): string {
	const { sceneSetting, visualDetails, humanActivity, atmosphere, cameraMovement, styleDirective } =
		components;

	// The first four parts flow together as a visual description, separated by commas.
	// Camera movement starts a new sentence because it shifts from description to direction.
	// Style directive continues as part of the camera sentence for flow.
	const visualDescription = [sceneSetting, visualDetails, humanActivity, atmosphere]
		.filter(Boolean)
		.join(', ');

	return `${visualDescription}. ${cameraMovement}. ${styleDirective}.`;
}

/**
 * Camera movement presets that work well with WAN for different scene types.
 * These are suggestions, not requirements. Custom movements are encouraged.
 */
export const CAMERA_MOVEMENTS = {
	/** Best for landscapes, harbors, and wide establishing shots */
	slowPan: 'Slow panning shot',
	/** Best for streets, piers, and linear spaces */
	tracking: 'Tracking shot',
	/** Best for immersive crowd scenes and markets */
	steadicam: 'Smooth steadicam shot',
	/** Best for modern scenes with action */
	gimbal: 'Smooth gimbal shot',
	/** Best for grand architecture and large gatherings */
	crane: 'Sweeping crane shot',
	/** Best for overhead views of crowds or landscapes */
	aerial: 'Sweeping aerial-style shot',
	/** Best for ominous or contemplative scenes */
	static: 'Static wide shot'
} as const;

/**
 * Style directive templates organized by approximate era.
 * These capture the visual language of period-appropriate film technology.
 */
export const STYLE_DIRECTIVES = {
	/** Pre-1880: Before motion pictures, evoke early photography */
	daguerreotype:
		'Vintage daguerreotype photography style brought to life, sepia tones, slight vignette',
	/** 1880-1920: Early cinema and documentary */
	earlyCinema:
		'Early cinema documentary style, black and white with slight sepia tint, authentic period atmosphere',
	/** 1930-1950: Classic Hollywood and newsreels */
	newsreel: 'Period newsreel style, black and white, documentary authenticity',
	/** 1930-1950: Noir aesthetic for dramatic scenes */
	noir: 'Noir documentary style, high contrast black and white, foreboding atmosphere',
	/** 1960s-1970s: Television and news documentary */
	sixtiesNews: 'Late 1960s news footage style, grainy film quality, historic moment of activism',
	/** 1970s: Urban documentary with gritty realism */
	seventiesGritty: 'Gritty 1970s documentary style, desaturated colors, film grain',
	/** Modern: Contemporary high-quality documentary */
	modern: 'Contemporary travel documentary style, vibrant colors, cinematic quality',
	/** Modern: Food and lifestyle content */
	foodDoc: 'Contemporary food documentary style, warm natural lighting, appetizing details'
} as const;

/**
 * Validates that a prompt string contains the expected structural elements.
 * Returns an object indicating which elements are present or missing.
 *
 * This is useful for quality-checking existing prompts in spots.json or
 * validating new prompts before they're added to the content library.
 *
 * Note: The validation uses broad pattern matching and may have false positives
 * or negatives. It's meant as a sanity check, not a strict grammar enforcer.
 */
export function validatePromptStructure(prompt: string): {
	isValid: boolean;
	hasSceneSetting: boolean;
	hasVisualDetails: boolean;
	hasHumanActivity: boolean;
	hasAtmosphere: boolean;
	hasCameraMovement: boolean;
	hasStyleDirective: boolean;
	warnings: string[];
} {
	const warnings: string[] = [];

	// Scene setting check: Look for location + date/era references
	const hasSceneSetting =
		/san francisco|alcatraz|chinatown|golden gate|ferry building|outside lands/i.test(prompt) &&
		/\d{4}|modern|during the/i.test(prompt);
	if (!hasSceneSetting) {
		warnings.push('Missing clear scene setting with location and time period');
	}

	// Visual details check: Look for physical objects, architectural elements, or landscape features
	const visualKeywords =
		/ships?|boats?|buildings?|docks?|piers?|tower|streets?|signs?|lanterns?|flags?|scaffolding|dunes?|stakes?|vegetation|carts?|stalls?|traps?|tepees?|blankets?|graffiti|gardens?|fountain|gate|rooftops?|balconies?|cannons?|fortress|barracks|cellhouse|freeway|highway|pillars?|palm trees?/i;
	const hasVisualDetails = visualKeywords.test(prompt);
	if (!hasVisualDetails) {
		warnings.push('Missing visual details about architecture, objects, or environment');
	}

	// Human activity check: Look for people doing things
	const humanKeywords =
		/men |women |people|workers?|fishermen|tourists?|crowds?|activists?|hippies|soldiers?|prisoners?|merchants?|visitors?|commuters?|residents?|lovers|cyclists|pedestrians|protesters?|children|officers?|guards?|Union |elderly|foot traffic|locals/i;
	const hasHumanActivity = humanKeywords.test(prompt);
	if (!hasHumanActivity) {
		warnings.push('Missing human activity or people in the scene');
	}

	// Atmosphere check: Look for weather, lighting, mood, or sensory elements
	const atmosphereKeywords =
		/fog|sun|light|morning|evening|dusk|dawn|overcast|golden|blue sky|seagulls|muted|warm|steam|smoke|incense|whistles?|bustling|glow|swirling|windswept|wind|Pacific Ocean|bay|rolling|atmosphere|optimistic|ominous|peaceful|defiance|festive|wonder|ambition|urban decay|renewal|afternoon|colorful|busy|lively/i;
	const hasAtmosphere = atmosphereKeywords.test(prompt);
	if (!hasAtmosphere) {
		warnings.push('Missing atmospheric elements like weather, lighting, or mood');
	}

	// Camera movement check: Look for cinematographic terms
	const cameraKeywords = /panning|tracking|steadicam|gimbal|crane|aerial|static|shot|sweeping/i;
	const hasCameraMovement = cameraKeywords.test(prompt);
	if (!hasCameraMovement) {
		warnings.push('Missing camera movement instruction');
	}

	// Style directive check: Look for visual style terminology
	const styleKeywords =
		/style|documentary|newsreel|daguerreotype|noir|film grain|sepia|black and white|cinematic|vintage|period|historic|grainy|desaturated|vibrant|high contrast|reconstruction|footage|tones|atmosphere/i;
	const hasStyleDirective = styleKeywords.test(prompt);
	if (!hasStyleDirective) {
		warnings.push('Missing style directive for visual treatment');
	}

	const isValid =
		hasSceneSetting &&
		hasVisualDetails &&
		hasHumanActivity &&
		hasAtmosphere &&
		hasCameraMovement &&
		hasStyleDirective;

	return {
		isValid,
		hasSceneSetting,
		hasVisualDetails,
		hasHumanActivity,
		hasAtmosphere,
		hasCameraMovement,
		hasStyleDirective,
		warnings
	};
}
