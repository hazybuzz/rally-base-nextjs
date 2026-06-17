

interface LoadingOverlayProps {
  message: string
}


export default function LoadingOverlay({
  message = "Loading...",
}: LoadingOverlayProps) {
  return (
    <div
      className="
        absolute
        inset-0
        z-50
        flex
        items-center
        justify-center
        rounded-xl
        bg-black/40
        backdrop-blur-sm
      "
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className="
            h-8
            w-8
            animate-spin
            rounded-full
            border-4
            border-gray-300
            border-t-black
          "
        />

        <p className="text-sm text-gray-300">
          {message}
        </p>
      </div>
    </div>
  );
}
