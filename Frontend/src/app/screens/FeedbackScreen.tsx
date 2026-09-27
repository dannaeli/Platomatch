import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AppLayout } from "../components/AppLayout";
import { useApp, SAMPLE_DISHES } from "../context/AppContext";
import { ChevronLeft, Send, CheckCircle, Star } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const QUICK_TAGS = ["Muy nutritivo", "Fácil de preparar", "Económico", "Delicioso", "Buen tamaño", "Muy saludable", "Recomendado"];

export function FeedbackScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useApp();
  const dish = SAMPLE_DISHES.find((d) => d.id === id);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!dish) {
    return (
      <AppLayout showNav>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-[#717182]">Plato no encontrado</p>
        </div>
      </AppLayout>
    );
  }

  function toggleTag(tag: string) {
    setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  }

  function handleSubmit() {
    if (rating === 0) return;
    setSubmitted(true);
  }

  const ratingLabels: Record<number, string> = {
    1: "Muy malo",
    2: "Regular",
    3: "Bueno",
    4: "Muy bueno",
    5: "Excelente",
  };

  if (submitted) {
    return (
      <AppLayout showNav>
        <div className="bg-[#1A5C3A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button onClick={() => navigate(`/dish/${dish.id}`)} className="flex items-center gap-1 text-[#A7D9BA] text-sm">
              <ChevronLeft size={18} /> Volver al plato
            </button>
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
          <div className="relative inline-block mb-6">
            <div className="w-28 h-28 bg-[#E8F5EE] rounded-full flex items-center justify-center">
              <div className="w-20 h-20 bg-[#D1FAE5] rounded-full flex items-center justify-center">
                <CheckCircle size={36} className="text-[#2ECC71]" />
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-[#FEF9C3] rounded-full flex items-center justify-center text-base">🎉</div>
          </div>
          <h2 className="text-[#1A2B2A] font-bold text-xl mb-2">¡Gracias por tu opinión!</h2>
          <p className="text-[#717182] text-sm leading-relaxed max-w-sm mx-auto mb-2">
            Tu feedback sobre <span className="font-semibold text-[#1A2B2A]">{dish.name}</span> nos ayuda a mejorar las recomendaciones para toda la comunidad.
          </p>
          <div className="flex items-center justify-center gap-1 mb-6 text-[#F59E0B] text-xl">
            {"★".repeat(rating)}{"☆".repeat(5 - rating)}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <button onClick={() => navigate(`/dish/${dish.id}`)} className="flex-1 py-3.5 bg-[#F5F9F7] border border-[#E0EDE6] text-[#717182] rounded-2xl text-sm font-medium">Ver plato</button>
            <button onClick={() => navigate("/results")} className="flex-1 py-3.5 bg-gradient-to-br from-[#2ECC71] to-[#27AE60] text-white rounded-2xl text-sm font-semibold shadow-lg shadow-[#2ECC71]/25">Explorar más</button>
          </div>
        </div>
      </AppLayout>
    );
  }

  const activeRating = hoverRating || rating;

  return (
    <AppLayout showNav>
      <div className="bg-[#1A5C3A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button onClick={() => navigate(`/dish/${dish.id}`)} className="flex items-center gap-1 text-[#A7D9BA] hover:text-white transition-colors text-sm">
            <ChevronLeft size={18} /> Volver al plato
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 pb-8">
        {/* Dish preview */}
        <div className="bg-white rounded-3xl shadow-sm border border-[#E8F5EE] overflow-hidden mb-5">
          <div className="flex items-center gap-4 p-4">
            <ImageWithFallback src={dish.image} alt={dish.name} className="w-20 h-20 rounded-2xl object-cover shrink-0" />
            <div>
              <p className="text-[#717182] text-xs mb-0.5">Calificando</p>
              <h2 className="text-[#1A2B2A] font-bold text-base leading-tight">{dish.name}</h2>
              <p className="text-[#2ECC71] font-semibold text-sm mt-0.5">S/. {dish.price.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Rating stars */}
        <div className="bg-white rounded-3xl shadow-sm border border-[#E8F5EE] p-6 mb-4">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 bg-[#FEF9C3] rounded-xl flex items-center justify-center">
              <Star size={14} className="text-[#F59E0B]" />
            </div>
            <p className="text-[#1A2B2A] font-semibold">¿Cómo calificarías este plato?</p>
          </div>

          <div className="flex items-center justify-center gap-3 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className={`transition-all duration-150 ${activeRating >= star ? "scale-110" : "scale-100"}`}
              >
                <Star
                  size={40}
                  className={`transition-colors ${activeRating >= star ? "text-[#F59E0B] fill-[#F59E0B]" : "text-gray-200 fill-gray-200"}`}
                />
              </button>
            ))}
          </div>

          {activeRating > 0 && (
            <p className="text-center text-[#1A5C3A] text-sm font-semibold">{ratingLabels[activeRating]}</p>
          )}
          {rating === 0 && activeRating === 0 && (
            <p className="text-center text-[#717182] text-xs">Toca una estrella para calificar</p>
          )}
        </div>

        {/* Quick tags */}
        <div className="bg-white rounded-3xl shadow-sm border border-[#E8F5EE] p-5 mb-4">
          <p className="text-[#1A2B2A] font-semibold text-sm mb-3">¿Qué destacas? <span className="text-[#717182] font-normal">(Opcional)</span></p>
          <div className="flex flex-wrap gap-2">
            {QUICK_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3.5 py-2 rounded-full text-xs font-medium border transition-all ${
                  selectedTags.includes(tag)
                    ? "bg-[#2ECC71] border-[#2ECC71] text-white shadow-md shadow-[#2ECC71]/20"
                    : "bg-[#F5F9F7] border-[#E0EDE6] text-[#1A2B2A] hover:border-[#2ECC71]/50"
                }`}
              >
                {selectedTags.includes(tag) && <span className="mr-1">✓</span>}{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div className="bg-white rounded-3xl shadow-sm border border-[#E8F5EE] p-5 mb-5">
          <label className="text-[#1A2B2A] font-semibold text-sm block mb-2">
            Comentario adicional <span className="text-[#717182] font-normal">(Opcional)</span>
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Cuéntanos más sobre tu experiencia con este plato..."
            rows={4}
            maxLength={300}
            className="w-full px-4 py-3.5 bg-[#F5F9F7] border-2 border-[#E0EDE6] rounded-2xl text-[#1A2B2A] text-sm placeholder-gray-400 outline-none focus:border-[#2ECC71] focus:ring-2 focus:ring-[#2ECC71]/20 transition-all resize-none"
          />
          <p className="text-[#717182] text-[10px] text-right mt-1">{comment.length}/300</p>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={rating === 0}
          className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold text-base transition-all ${
            rating > 0
              ? "bg-gradient-to-br from-[#2ECC71] to-[#27AE60] text-white shadow-xl shadow-[#2ECC71]/30 active:scale-[0.97]"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          <Send size={18} /> Enviar opinión
        </button>
        {rating === 0 && <p className="text-center text-[#717182] text-xs mt-2">Selecciona al menos una estrella para continuar</p>}
      </div>
    </AppLayout>
  );
}
