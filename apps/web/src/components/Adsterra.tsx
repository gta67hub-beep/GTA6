const ADSTERRA_CODE = `<script data-cfasync="false" src="https://abscloud.org/1/fbd16d7f1963ce4c16ac8a305342549a"></script>
<script data-cfasync="false" src="https://bauval.org/14/08b416a1e35d4dcdc43c81d1234c6f03"></script>
<script>
  atOptions = {
    'key' : 'dc4dba066d9a6da87140eaebf2747c21',
    'format' : 'iframe',
    'height' : 600,
    'width' : 160,
    'params' : {}
  };
</script>
<script async="async" data-cfasync="false" src="https://bauval.org/21/83cba87a088a945b986540472cd3d65c"></script>
<div id="container-83cba87a088a945b986540472cd3d65c"></div>`;

export default function Adsterra() {
  return <div dangerouslySetInnerHTML={{ __html: ADSTERRA_CODE }} />;
}
