import { useTemplates } from '@/context/TemplatesContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2 } from 'lucide-react';

interface TemplatesListProps {
  onSelect: (content: string) => void;
  onEdit: (template: { id: string; name: string; content: string }) => void;
  onCreate: () => void;
}

export default function TemplatesList({ onSelect, onEdit, onCreate }: TemplatesListProps) {
  const { templates, deleteTemplate } = useTemplates();

  if (templates.length === 0) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Templates</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">No templates yet</p>
          <Button onClick={onCreate} className="mt-4">
            Create your first template
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Templates</CardTitle>
        <Button onClick={onCreate}>New Template</Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {templates.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition"
            onClick={() => onSelect(t.content)}
          >
            <div>
              <p className="font-medium">{t.name}</p>
              <p className="text-sm text-muted-foreground truncate max-w-md">
                {t.content}
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={(e) => {
                e.stopPropagation();
                onEdit(t);
              }}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={(e) => {
                e.stopPropagation();
                deleteTemplate(t.id);
              }}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
