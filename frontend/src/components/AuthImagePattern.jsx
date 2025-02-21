/**
 * AuthImagePattern Component
 *
 * A decorative component used in authentication pages (e.g., login, signup),
 * featuring a grid of animated placeholder boxes and a title with a subtitle.
 * This is typically used as a background or accompanying visual for authentication-related content.
 *
 * Props:
 * - title (string): The main title to display above the image grid.
 * - subtitle (string): The subtitle to display below the title.
 *
 * Features:
 * - Displays a grid of 9 boxes that alternate between static and animated styles (pulse effect).
 * - The grid is centered and responsive, visible only on large screen sizes (`lg`).
 * - Customizable `title` and `subtitle` to fit various contexts.
 */
const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        {/* Image grid with 9 boxes */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-primary/10 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>

        {/* Title and Subtitle */}
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
