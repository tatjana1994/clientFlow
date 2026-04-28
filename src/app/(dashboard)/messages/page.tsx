import { MessageActions } from '@/src/components/messages/message-actions';
import { MessageForm } from '@/src/components/messages/message-form';
import { createClient } from '@/src/lib/supabase/server';

type Project = {
  id: string;
  name: string;
  client_name: string;
};

type Message = {
  id: string;
  author_name: string;
  type: string;
  message: string;
  created_at: string;
  projects:
    | {
        name: string;
        client_name: string;
      }[]
    | null;
};

function getTypeClass(type: string) {
  if (type === 'internal') {
    return 'bg-purple-50 text-purple-700';
  }

  return 'bg-sky-50 text-sky-700';
}

export default async function MessagesPage() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from('projects')
    .select('id, name, client_name')
    .order('created_at', { ascending: false });

  const { data: messages } = await supabase
    .from('messages')
    .select(
      `
      id,
      author_name,
      type,
      message,
      created_at,
      projects (
        name,
        client_name
      )
    `,
    )
    .order('created_at', { ascending: false });

  const typedProjects = (projects || []) as Project[];
  const typedMessages = (messages || []) as Message[];

  return (
    <div className='space-y-8'>
      <div>
        <h2 className='text-2xl font-semibold text-slate-950'>Messages</h2>
        <p className='mt-1 text-sm text-slate-500'>
          Keep project communication and internal notes in one place.
        </p>
      </div>

      {!typedProjects.length && (
        <div className='rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800'>
          Create a project first before adding messages.
        </div>
      )}

      <MessageForm projects={typedProjects} />

      <div className='rounded-3xl border border-slate-200 bg-white shadow-sm'>
        <div className='border-b border-slate-200 px-6 py-4'>
          <h3 className='text-lg font-semibold text-slate-950'>
            Message history
          </h3>
        </div>

        {!typedMessages.length ? (
          <div className='p-10 text-center'>
            <h3 className='text-lg font-semibold text-slate-950'>
              No messages yet
            </h3>
            <p className='mt-2 text-sm text-slate-500'>
              Add your first project note using the form above.
            </p>
          </div>
        ) : (
          <div className='divide-y divide-slate-100'>
            {typedMessages.map((item) => (
              <div key={item.id} className='p-6'>
                <div className='flex items-start justify-between gap-4'>
                  <div>
                    <div className='flex flex-wrap items-center gap-2'>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${getTypeClass(
                          item.type,
                        )}`}
                      >
                        {item.type === 'internal'
                          ? 'Internal note'
                          : 'Client note'}
                      </span>

                      <span className='text-xs text-slate-400'>
                        {new Date(item.created_at).toLocaleDateString('en-US')}
                      </span>
                    </div>

                    <h4 className='mt-3 font-semibold text-slate-950'>
                      {item.projects?.[0]?.name || 'Unknown project'}{' '}
                    </h4>

                    <p className='mt-1 text-sm text-slate-500'>
                      {item.projects?.[0]?.client_name || 'No client'} · by{' '}
                      {item.author_name}
                    </p>
                  </div>

                  <MessageActions messageId={item.id} />
                </div>

                <p className='mt-4 whitespace-pre-line text-sm leading-6 text-slate-700'>
                  {item.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
