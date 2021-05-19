import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { useMyState } from '@utils/publishState';
import purify from '@utils/purify';
import 'easymde/dist/easymde.min.css';

const DynamicMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

export default function Description() {
  const { state, setState } = useMyState();

  // simple mde
  // const [simpleMdeInstance, setMdeInstance] = useState(null);

  // const getMdeInstanceCallback = useCallback((simpleMde) => {
  //   setMdeInstance(simpleMde);
  // }, []);

  // useEffect(() => {
  //   simpleMdeInstance && console.info("Hey I'm editor instance!", simpleMdeInstance);
  // }, [simpleMdeInstance]);

  // codemirror
  // const [codemirrorInstance, setCodemirrorInstance] = useState(null);

  // const getCmInstanceCallback = useCallback((editor) => {
  //   setCodemirrorInstance(editor);
  // }, []);

  // useEffect(() => {
  //   codemirrorInstance && console.info("Hey I'm codemirror instance!", codemirrorInstance);
  // }, [codemirrorInstance]);

  // // line and cursor
  // const [lineAndCursor, setLineAndCursor] = useState(null);

  // const getLineAndCursorCallback = useCallback((position) => {
  //   setLineAndCursor(position);
  // }, []);

  // useEffect(() => {
  //   lineAndCursor && console.info("Hey I'm line and cursor info!", lineAndCursor);
  // }, [lineAndCursor]);

  const options = useMemo(() => {
    return {
      // hideIcons: ['guide'], // https://simplemde.com/markdown-guide
      placeholder: 'Décrivez votre annonce en détail...',
      renderingConfig: {
        sanitizerFunction(html) {
          return purify(html);
        },
      },
      spellChecker: false,
      status: false,
    };
  }, []);

  return (
    <DynamicMDE
      // getCodemirrorInstance={getCmInstanceCallback}
      // getMdeInstance={getMdeInstanceCallback}
      options={options}
      value={state.description}
      onChange={(value) => {
        setState('description', value);
      }}
    />
  );
}
