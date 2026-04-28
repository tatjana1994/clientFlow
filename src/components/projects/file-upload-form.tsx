import { uploadProjectFile } from '@/src/app/(dashboard)/projects/actions';

type FileUploadFormProps = {
  projectId: string;
};

export function FileUploadForm({ projectId }: FileUploadFormProps) {
  return (
    <form action={uploadProjectFile} className='mt-5 flex gap-2'>
      <input type='hidden' name='projectId' value={projectId} />

      <input
        name='file'
        type='file'
        required
        accept='.pdf,.png,.jpg,.jpeg,.webp'
        className='min-w-0 flex-1 rounded-2xl border border-slate-200 px-4 py-2.5 text-sm file:mr-4 file:rounded-xl file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-sm file:font-medium'
      />

      <button
        type='submit'
        className='rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800'
      >
        Upload
      </button>
    </form>
  );
}
