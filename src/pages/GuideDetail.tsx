import { useParams, Link, useNavigate } from "react-router-dom";
import { guides } from "@/data/guides";
import Header from "@/components/Header";
import { Star, MapPin, Globe, Clock, ArrowLeft, Calendar } from "lucide-react";

const GuideDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const guide = guides.find((g) => g.id === id);

  if (!guide) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">Guide not found.</p>
          <Link to="/" className="mt-4 inline-block text-primary hover:underline">
            Back to search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
            <img
              src={guide.avatar}
              alt={guide.name}
              className="h-24 w-24 shrink-0 rounded-full bg-accent"
            />
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{guide.name}</h1>
                  <div className="mt-1 flex items-center justify-center gap-2 text-sm text-muted-foreground sm:justify-start">
                    <MapPin className="h-4 w-4" />
                    {guide.location}
                  </div>
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-2xl font-bold text-foreground">₹{guide.pricePerDay.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">per day</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm sm:justify-start">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <strong>{guide.rating}</strong>
                  <span className="text-muted-foreground">({guide.reviewCount} reviews)</span>
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {guide.experience} years exp.
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  {guide.languages.join(", ")}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-sm font-semibold text-foreground">About</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{guide.bio}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-sm font-semibold text-foreground">Specialties</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {guide.specialties.map((s) => (
                <span key={s} className="rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            {guide.available ? (
              <Link
                to={`/book/${guide.id}`}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Calendar className="h-4 w-4" />
                Book This Guide
              </Link>
            ) : (
              <div className="rounded-lg bg-muted px-6 py-3 text-center text-sm text-muted-foreground">
                This guide is currently unavailable
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideDetail;
