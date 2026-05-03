-- ============================================================
-- Figuritas Mundial 2026 - Supabase Schema
-- Ejecutar en el SQL Editor de Supabase
-- ============================================================

-- Tabla de perfiles (se crea automáticamente al registrar un usuario)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);


-- Tabla de figuritas del usuario
CREATE TABLE IF NOT EXISTS public.user_stickers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  sticker_id TEXT NOT NULL,
  count INTEGER DEFAULT 1 CHECK (count >= 1),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, sticker_id)
);

ALTER TABLE public.user_stickers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all user_stickers" ON public.user_stickers
  FOR SELECT USING (true);

CREATE POLICY "Users can manage own stickers" ON public.user_stickers
  FOR ALL USING (auth.uid() = user_id);


-- Función para crear perfil automáticamente al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para ejecutar la función al crear usuario
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
