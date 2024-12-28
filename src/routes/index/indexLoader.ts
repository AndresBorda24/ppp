import { appFetch } from "../../AppFetch";
import { PaginationProjects } from "../../types";
import { ActionFunctionArgs } from "react-router-dom";

export async function indexLoader({ request }: ActionFunctionArgs ) {
  const url = new URL(request.url)
  const title  = url.searchParams.get('title');
  const page   = url.searchParams.get('page');
  const order  = url.searchParams.get('order') ?? 'asc';
  const status = url.searchParams.get('status');
  const amount = url.searchParams.get('amount') ?? '10';

  const { data, error } = await appFetch<PaginationProjects>('GET', {
    url: '/projects', body: null, settings: {
      params: { title, page, status, amount }
    }
  });

  return { data, error, title, page, status, order, amount }
}
