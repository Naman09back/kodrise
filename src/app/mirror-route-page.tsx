import {notFound} from "next/navigation";
import MirroredPage from "./mirrored-page";
import {getCodiantMirrorByPath} from "@/lib/codiant-mirrors";

export default async function MirrorRoutePage({pathname}: {pathname: string}) {
  const route = await getCodiantMirrorByPath(pathname);
  if (!route) notFound();
  const title = route.KodrisePath === "/" ? "Kodrise Home" : `Kodrise ${route.KodrisePath.slice(1).replaceAll("/", " · ")}`;
  return <MirroredPage pathname={route.KodrisePath} title={title} />;
}
