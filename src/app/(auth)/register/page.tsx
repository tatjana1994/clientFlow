import { redirect } from 'next/navigation';
import { createClient } from '@/src/lib/supabase/server';
import RegisterForm from './register-form';

export default async function RegisterPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/dashboard');
  }

  return <RegisterForm />;
}
