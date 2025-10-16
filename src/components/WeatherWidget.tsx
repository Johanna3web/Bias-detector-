import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cloud, Search } from "lucide-react";
import { toast } from "sonner";

export const WeatherWidget = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (!city.trim()) {
      toast.error("Please enter a city name");
      return;
    }

    setLoading(true);
    try {
      // Using Open-Meteo free API (no API key needed)
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
      );
      const geoData = await geoResponse.json();
      
      if (!geoData.results?.[0]) {
        toast.error("City not found");
        setLoading(false);
        return;
      }

      const { latitude, longitude, name } = geoData.results[0];
      
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode,windspeed_10m&timezone=auto`
      );
      const weatherData = await weatherResponse.json();
      
      setWeather({
        city: name,
        temp: Math.round(weatherData.current.temperature_2m),
        windSpeed: weatherData.current.windspeed_10m,
        code: weatherData.current.weathercode,
      });
      toast.success("Weather updated!");
    } catch (error) {
      toast.error("Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  };

  const getWeatherDescription = (code: number) => {
    if (code === 0) return "Clear sky";
    if (code <= 3) return "Partly cloudy";
    if (code <= 67) return "Rainy";
    if (code <= 77) return "Snowy";
    return "Stormy";
  };

  return (
    <Card className="p-6 bg-card border-2 border-primary/20">
      <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <Cloud className="w-5 h-5" />
        Weather Updates
      </h3>
      <div className="flex gap-2 mb-4">
        <Input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          onKeyPress={(e) => e.key === 'Enter' && getWeather()}
        />
        <Button onClick={getWeather} disabled={loading} size="icon">
          <Search className="w-4 h-4" />
        </Button>
      </div>
      {weather && (
        <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg text-center">
          <p className="text-2xl font-bold text-foreground">{weather.city}</p>
          <p className="text-4xl font-bold text-primary my-2">{weather.temp}°C</p>
          <p className="text-muted-foreground">{getWeatherDescription(weather.code)}</p>
          <p className="text-sm text-muted-foreground mt-2">Wind: {weather.windSpeed} km/h</p>
        </div>
      )}
    </Card>
  );
};