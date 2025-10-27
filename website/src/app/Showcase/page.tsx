import LostGalleryWithModal from "@/components/Effect/LostGalleryWithModal";
import LostGallery3D from "@/components/Effect/LostGallery3D";

export default function Page() {
  return (
    <main className="relative min-h-screen w-screen">
      {/* 3D background layer */}
      <div className="absolute inset-0 -z-10">
        <LostGallery3D />
      </div>

      {/* UI overlay */}
      <div className="relative z-10">
        <LostGalleryWithModal />
      </div>
    </main>
  );
}
