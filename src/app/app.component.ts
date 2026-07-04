import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";

interface Stat {
  label: string;
  value: number; // 0-100
  hint: string;
}

interface Quest {
  title: string;
  status: "completada" | "en curso" | "permanente";
}

interface Countdown {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild("awakeningRef") awakeningRef?: ElementRef<HTMLElement>;

  readonly nombre = "Santiago Gonzalez";
  readonly edad = 24;
  readonly edadNueva = this.edad + 1;
  readonly tituloEspecial = "El único S-Rank de mi corazón";
  readonly cartaFinal = `No hay un sistema que mida lo que siento por ti, pero si existiera,
marcaría nivel máximo desde que he entendido que es el amar.

Gracias por elegir subir de nivel a mi lado, por convertir cada día común en una mazmorra que se siente ligera solo porque vamos juntos.
Aunque hay jefes y obstaculos nunca consigo perder la fé en nuestro camino.
No necesito una notificación del sistema para saberlo: eres mi persona favorita en este mundo y en cualquier otro.
Espero vivir en mas niveles contigo, más llenos de felicidad, amor, cariño y comprensión.

Feliz cumpleaños, mi amor hermoso. Que este nuevo nivel venga cargado de victorias, risas y muchas más aventuras contigo como protagonista.

No sé cuando para mi...se volvió tan poco ficticio en la realidad que piense en casarme contigo, pero si algún día nos ocurre, quiero que sea contigo. No hay nadie más con quien quiera subir de nivel en la vida.
No me veo con nadie más que contigo, y aunque amar sea hermoso, también es complicado, pero contigo todo es más armonioso y alegre.
Puede que no te vea en estos momentos a los ojos, pero los imagino y me llenan de emoción, porque todo esto no trata de distancias, finalmente esto es de certezas: que me amas y que te amo y así perfectamente amo el día en que haz nacido.
No puedo esperar a verte y abrazarte de nuevo, mi corazón. Que este día sea tan especial como tú lo eres para mí.

Te amo. Siempre en tu party. ⚔️`;

  // Fecha de su cumpleaños (año, mes 0-indexado, día). Cámbiala si la necesitas otro año.
  readonly fechaCumple = new Date(2026, 6, 6, 0, 0, 0); // 6 de julio de 2026
  // ======================================================

  readonly bootLines = [
    "> Iniciando sistema...",
    "> Detectando anomalía de nivel S...",
    "> Anomalía identificada: CUMPLEAÑOS",
    "> Cargando estado del jugador...",
  ];

  readonly stats: Stat[] = [
    { label: "Fuerza", value: 92, hint: "para aguantar mis chistes malos" },
    { label: "Carisma", value: 98, hint: "literal no puedo con tu sonrisa" },
    { label: "Paciencia", value: 87, hint: "conmigo, especialmente" },
    { label: "Suerte", value: 100, hint: "me tienes a mí, obvio" },
  ];

  readonly quests: Quest[] = [
    { title: "Conquistar mi corazón", status: "completada" },
    { title: "Hacerme reír todos los días", status: "permanente" },
    { title: "Ser mi compañero de aventuras", status: "completada" },
    { title: "Quererte cada día más", status: "en curso" },
  ];

  readonly awakeningLines = [
    "Analizando anomalía...",
    "Rango detectado: SOMBRA MONARCA",
    "DESPERTAR COMPLETADO",
  ];

  booted = signal(false);
  visibleBootLines = signal<number>(0);
  ageCount = signal(0);
  letterOpen = signal(false);
  awakened = signal(false);
  awakeningLineIndex = signal(0);
  chibiFrame = signal(1);
  countdown = signal<Countdown>({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
  esHoy = signal(false);
  showLevelUp = signal(false);

  private countdownInterval?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.playBootSequence();
    this.startCountdown();
    setInterval(() => {
      this.chibiFrame.update((f) => (f === 1 ? 2 : 1));
    }, 700);
  }

  private startCountdown(): void {
    this.updateCountdown();
    this.countdownInterval = setInterval(() => this.updateCountdown(), 1000);
  }

  private updateCountdown(): void {
    const ahora = new Date().getTime();
    const objetivo = this.fechaCumple.getTime();
    const diferencia = objetivo - ahora;

    if (diferencia <= 0) {
      this.esHoy.set(true);
      this.countdown.set({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
      if (this.countdownInterval) clearInterval(this.countdownInterval);
      this.animateLevelUp();
      return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor(
      (diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
    this.countdown.set({ dias, horas, minutos, segundos });
  }

  ngAfterViewInit(): void {
    const el = this.awakeningRef?.nativeElement;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.awakened()) {
            this.triggerAwakening();
          }
        });
      },
      { threshold: 0.45 },
    );
    observer.observe(el);
  }

  toggleLevelUp(): void {
    this.showLevelUp.update((v) => !v);
    this.triggerAwakening();
  }

  triggerAwakening(): void {
    this.awakened.set(true);
    this.awakeningLineIndex.set(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      this.awakeningLineIndex.set(i);
      if (i >= this.awakeningLines.length) clearInterval(interval);
    }, 900);
  }

  private playBootSequence(): void {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      this.visibleBootLines.set(i);
      if (i >= this.bootLines.length) {
        clearInterval(interval);
        setTimeout(() => {
          this.booted.set(true);
          this.animateAgeCounter();
        }, 500);
      }
    }, 550);
  }

  private animateAgeCounter(): void {
    const target = this.edad;
    let current = 0;
    const step = Math.max(1, Math.round(target / 30));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      this.ageCount.set(current);
    }, 40);
  }

  private animateLevelUp(): void {
    const target = this.edadNueva;
    let current = this.ageCount();
    const interval = setInterval(() => {
      current += 1;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      this.ageCount.set(current);
    }, 120);
  }

  toggleLetter(): void {
    this.letterOpen.update((v) => !v);
  }
}
