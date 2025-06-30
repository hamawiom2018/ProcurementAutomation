document.addEventListener('DOMContentLoaded', async () => {
  const head = document.head;
  const loaders = Array.from(document.querySelectorAll('[data-partial]')).map(async el => {
    const resp = await fetch(el.getAttribute('data-partial'));
    if (resp.ok) el.innerHTML = await resp.text();
    const css = el.getAttribute('data-css');
    if (css) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = css;
      head.appendChild(link);
    }
    const js = el.getAttribute('data-script');
    if (js) {
      const s = document.createElement('script');
      s.src = js;
      head.appendChild(s);
    }
  });
  await Promise.all(loaders);
  initPage();
});

function initPage(){

const totalSteps = 13;
    let currentStep = 0;
    // Navigation & progress
    window.showRole = function(idx) {
      // Hide all roles and remove active from all buttons
      for(let r=0;r<=12;r++){
        var roleDiv = document.getElementById('role'+r);
        if (roleDiv) roleDiv.style.display = (r===idx?'block':'none');
        var roleBtn = document.querySelectorAll('.role-btn')[r];
        if (roleBtn) roleBtn.classList.toggle('active', r===idx);
      }
      // progress
      currentStep = idx;
      document.querySelectorAll('.step-node').forEach((el,i)=>{
        el.classList.toggle('done', i<idx);
        el.classList.toggle('active', i===idx);
      });
      updateExpertCost();
      positionSvgLines();
    }

    function nextVisibleSibling(el){
      var n = el ? el.nextElementSibling : null;
      while(n && getComputedStyle(n).display === 'none'){
        n = n.nextElementSibling;
      }
      return n;
    }

    function positionSvgLines(){
      var bar = document.getElementById('stepsBar');
      var svg = document.getElementById('stepsSvg');
      if(!bar || !svg) return;
      var width = bar.clientWidth;
      var branchY = 123;
      svg.setAttribute('viewBox', '0 0 '+width+' '+branchY);
      var mainLine = document.getElementById('mainLine');
      var progressMain = document.getElementById('progressMain');
      var subVert = document.getElementById('subVert');
      var progressSubVert = document.getElementById('progressSubVert');
      var subHoriz = document.getElementById('subHoriz');
      var progressSubHoriz = document.getElementById('progressSubHoriz');
      var subHoriz2 = document.getElementById('subHoriz2');
      var progressSubHoriz2 = document.getElementById('progressSubHoriz2');
      var subHoriz3 = document.getElementById('subHoriz3');
      var progressSubHoriz3 = document.getElementById('progressSubHoriz3');
      var subReturn = document.getElementById('subReturn');
      var progressSubReturn = document.getElementById('progressSubReturn');
      if(mainLine){
        mainLine.setAttribute('x1',width-52);
        mainLine.setAttribute('y1',30);
        mainLine.setAttribute('x2',52);
        mainLine.setAttribute('y2',30);
      }
      if(progressMain){
        progressMain.setAttribute('x1',width-52);
        progressMain.setAttribute('y1',30);
        progressMain.setAttribute('x2',52);
        progressMain.setAttribute('y2',30);
        var len = width-104;
        progressMain.style.strokeDasharray = len;
        var done = len*(currentStep/(totalSteps-1));
        progressMain.style.strokeDashoffset = len - done;
        progressMain.style.display='block';
      }
      var subNodes = document.querySelectorAll('.step-node.sub-step');
      var subStep = subNodes[0];
      var secondSub = subNodes[1];
      var lastSub = (secondSub && getComputedStyle(secondSub).display!=='none') ? secondSub : null;
      if(subStep && subVert && subHoriz){
        var barRect = bar.getBoundingClientRect();
        var anchor = subStep.previousElementSibling;
        var anchorRect = anchor ? anchor.getBoundingClientRect() : subStep.getBoundingClientRect();
        var subRect = subStep.getBoundingClientRect();
        var lastRect = lastSub ? lastSub.getBoundingClientRect() : subRect;
        var nextNode = nextVisibleSibling(lastSub ? lastSub : subStep);
        var nextRect = nextNode ? nextNode.getBoundingClientRect() : lastRect;
        var xAnchor = anchorRect.left + anchorRect.width/2 - barRect.left;
        var xSub = subRect.left + subRect.width/2 - barRect.left;
        var xLast = lastSub ? lastRect.left + lastRect.width/2 - barRect.left : xSub;
        var xAfter = nextRect.left + nextRect.width/2 - barRect.left;
        var centerY = branchY;

        subVert.setAttribute('x1', xAnchor);
        subVert.setAttribute('x2', xAnchor);
        subVert.setAttribute('y1',30);
        subVert.setAttribute('y2', branchY);

        subHoriz.setAttribute('x1', xAnchor);
        subHoriz.setAttribute('x2', xSub);
        subHoriz.setAttribute('y1', branchY);
        subHoriz.setAttribute('y2', branchY);

        if(subHoriz2){
          subHoriz2.setAttribute('x1', xSub);
          subHoriz2.setAttribute('x2', lastSub ? xLast : xAfter);
          subHoriz2.setAttribute('y1', branchY);
          subHoriz2.setAttribute('y2', branchY);
        }

        if(subHoriz3 && subReturn){
          if(lastSub){
            subHoriz3.setAttribute('x1', xLast);
            subHoriz3.setAttribute('x2', xAfter);
            subHoriz3.setAttribute('y1', branchY);
            subHoriz3.setAttribute('y2', branchY);
          }
          subReturn.setAttribute('x1', xAfter);
          subReturn.setAttribute('x2', xAfter);
          subReturn.setAttribute('y1', branchY);
          subReturn.setAttribute('y2', 30);
          if(!lastSub) subHoriz3.style.display='none';
        }

        var need = document.getElementById('need-shared') && document.getElementById('need-shared').checked;
        if(progressSubVert){
          progressSubVert.setAttribute('x1', xAnchor);
          progressSubVert.setAttribute('x2', xAnchor);
          progressSubVert.setAttribute('y1',30);
          progressSubVert.setAttribute('y2', branchY);
          var vlen = branchY-30;
          progressSubVert.style.strokeDasharray = vlen;
          var vdone = currentStep>=5 ? vlen : 0;
          progressSubVert.style.strokeDashoffset = vlen - vdone;
          progressSubVert.style.display = need && currentStep>=5 ? 'block' : 'none';
        }

        if(progressSubHoriz){
          progressSubHoriz.setAttribute('x1', xAnchor);
          progressSubHoriz.setAttribute('x2', xSub);
          progressSubHoriz.setAttribute('y1', branchY);
          progressSubHoriz.setAttribute('y2', branchY);
          var hlen = xSub - xAnchor;
          progressSubHoriz.style.strokeDasharray = hlen;
          var hdone = currentStep>=5 ? hlen : 0;
          progressSubHoriz.style.strokeDashoffset = hlen - hdone;
          progressSubHoriz.style.display = need && currentStep>=5 ? 'block' : 'none';
        }

        if(progressSubHoriz2){
          progressSubHoriz2.setAttribute('x1', xSub);
          progressSubHoriz2.setAttribute('x2', lastSub ? xLast : xAfter);
          progressSubHoriz2.setAttribute('y1', branchY);
          progressSubHoriz2.setAttribute('y2', branchY);
          var hlen2 = (lastSub ? xLast : xAfter) - xSub;
          progressSubHoriz2.style.strokeDasharray = hlen2;
          var hdone2 = currentStep>=6 ? hlen2 : 0;
          progressSubHoriz2.style.strokeDashoffset = hlen2 - hdone2;
          progressSubHoriz2.style.display = need && currentStep>=5 ? 'block' : 'none';
        }

        if(progressSubHoriz3){
          if(lastSub){
            progressSubHoriz3.setAttribute('x1', xLast);
            progressSubHoriz3.setAttribute('x2', xAfter);
            progressSubHoriz3.setAttribute('y1', branchY);
            progressSubHoriz3.setAttribute('y2', branchY);
            var hlen3 = xAfter - xLast;
            progressSubHoriz3.style.strokeDasharray = hlen3;
            var hdone3 = currentStep>=8 ? hlen3 : 0;
            progressSubHoriz3.style.strokeDashoffset = hlen3 - hdone3;
            progressSubHoriz3.style.display = need && currentStep>=5 ? 'block' : 'none';
          } else {
            progressSubHoriz3.style.display = 'none';
          }
        }

        if(progressSubReturn){
          progressSubReturn.setAttribute('x1', xAfter);
          progressSubReturn.setAttribute('x2', xAfter);
          progressSubReturn.setAttribute('y1', branchY);
          progressSubReturn.setAttribute('y2', 30);
          var rlen = branchY - 30;
          progressSubReturn.style.strokeDasharray = rlen;
          var rdone = currentStep>=8 ? rlen : 0;
          progressSubReturn.style.strokeDashoffset = rlen - rdone;
          progressSubReturn.style.display = need && currentStep>=5 ? 'block' : 'none';
        }
      }
    }

    function toggleSharedLines(need){
      var elements = ['subVert','subHoriz','subHoriz2','subHoriz3','subReturn',
        'progressSubVert','progressSubHoriz','progressSubHoriz2','progressSubHoriz3','progressSubReturn'];
      document.querySelectorAll('.step-node.sub-step')
        .forEach(el=>el.style.display = need ? 'flex' : 'none');
      elements.forEach(id=>{var e=document.getElementById(id); if(e) e.style.display = need ? 'block' : 'none';});
      positionSvgLines();
    }

    function toggleDirector(need){
      var dirBtn = document.querySelectorAll('.role-btn')[6];
      var dirNode = document.querySelectorAll('.step-node.sub-step')[1];
      ['subHoriz3','progressSubHoriz3'].forEach(id=>{
        var el = document.getElementById(id);
        if(el) el.style.display = need ? 'block' : 'none';
      });
      if(dirBtn) dirBtn.style.display = need ? 'inline-block' : 'none';
      if(dirNode) dirNode.style.display = need ? 'flex' : 'none';
      positionSvgLines();
    }

    window.sendToSharedServices = function(){
      var need = document.getElementById('need-shared') && document.getElementById('need-shared').checked;
      toggleSharedLines(need);
      var btn5 = document.querySelectorAll('.role-btn')[5];
      var btn6 = document.querySelectorAll('.role-btn')[6];
      var needDirBox = document.getElementById('need-director');
      var needDir = needDirBox ? needDirBox.checked : false;
      if(need){
        if(btn5) btn5.style.display='inline-block';
        if(btn6) btn6.style.display = needDir ? 'inline-block' : 'none';
        toggleDirector(needDir);
        showRole(5);
        showNotification('تم إرسال الطلب إلى مدير الإدارة العامة للخدمات المشتركة!');
      } else {
        if(btn5) btn5.style.display='none';
        if(btn6) btn6.style.display='none';
        toggleDirector(false);
        showNotification('تم تخطي موافقة مدير الإدارة العامة للخدمات المشتركة');
      }
    }

    window.assignToProcurement = function(){
      var sel = document.getElementById('assignee');
      var name = sel ? sel.value : '';
      showNotification('تم إسناد الطلب إلى ' + (name || 'موظف المشتريات') + '!');
      showRole(8);
    }

    window.approveCompetition = function(){
      showNotification('تم اعتماد المنافسة!');
      var btn = document.querySelectorAll('.role-btn')[7];
      if(btn) btn.style.display = 'inline-block';
      var node = document.getElementById('assignNode');
      if(node) node.style.display = 'flex';
      positionSvgLines();
      showRole(7);
    }

    function toggleManagerOption(){
      var option = document.querySelector('input[name="managerAction"]:checked');
      var assignBox = document.getElementById('assignBox');
      var assignBtn = document.getElementById('assignBtn');
      var sharedBtn = document.getElementById('sendSharedBtn');
      var needShared = document.getElementById('need-shared');
      var isAssign = option && option.value === 'assign';
      if(assignBox) assignBox.style.display = isAssign ? 'block' : 'none';
      if(assignBtn) assignBtn.style.display = isAssign ? 'inline-block' : 'none';
      if(sharedBtn) sharedBtn.style.display = option && option.value === 'shared' ? 'inline-block' : 'none';
      if(needShared){
        needShared.checked = option && option.value === 'shared';
        toggleSharedLines(needShared.checked);
      }
    }

    function updateExpertCost(){
      var val = document.getElementById('expert-cost') ? document.getElementById('expert-cost').value.trim() : '';
      document.querySelectorAll('.expert-cost-display').forEach(el=>{
        el.textContent = val || '-';
      });
    }
    var expertCostInput = document.getElementById('expert-cost');
    if(expertCostInput){
      expertCostInput.addEventListener('input', updateExpertCost);
    }
    updateExpertCost();
    var needShared = document.getElementById('need-shared');
    if(needShared){
      needShared.addEventListener('change',function(){
        toggleSharedLines(this.checked);
      });
      toggleSharedLines(needShared.checked);
    }
    var needDirectorBox = document.getElementById('need-director');
    if(needDirectorBox){
      needDirectorBox.addEventListener('change', function(){
        toggleDirector(this.checked);
      });
      toggleDirector(needDirectorBox.checked);
    }
    document.querySelectorAll('input[name="managerAction"]').forEach(r=>{
      r.addEventListener('change', toggleManagerOption);
    });
    toggleManagerOption();
    positionSvgLines();
    window.addEventListener('resize', positionSvgLines);
    if(document.getElementById('role0')) showRole(0);

    // Conditional reason field
    var plan0 = document.getElementById('plan0');
    if(plan0) {
      plan0.addEventListener('change',e=>{
        var reasonDiv = document.getElementById('reason0');
        if(reasonDiv) reasonDiv.style.display = e.target.value==='no'?'block':'none';
      });
    }

    var planFinance = document.getElementById('planFinance');
    if(planFinance) {
      planFinance.addEventListener('change', e => {
        var reasonDiv = document.getElementById('reasonFinance');
        if(reasonDiv) reasonDiv.style.display = e.target.value==='no' ? 'block' : 'none';
      });
    }

    // Departments table logic
    let departments = ["الأمن السيبراني","المالية"];
    function renderDepartments(){
      const tbody = document.getElementById('departments-body');
      if (!tbody) return;
      tbody.innerHTML = departments.map((dep,i)=>`
        <tr>
          <td>${i+1}</td>
          <td>${dep}</td>
          <td>
            <button onclick="moveUp(${i})" title="أعلى"><i class="bi bi-arrow-up"></i></button>
            <button onclick="moveDown(${i})" title="أسفل"><i class="bi bi-arrow-down"></i></button>
            <button onclick="removeDepartment(${i})" title="حذف"><i class="bi bi-trash"></i></button>
          </td>
        </tr>`).join('');
    }
    window.addDepartment = function(){
      const sel = document.getElementById('department-select');
      if(sel){
        const val = sel.value;
        if(val && !departments.includes(val)){
          departments.push(val); renderDepartments();
        }
      }
    }
    window.removeDepartment = function(i){ departments.splice(i,1); renderDepartments(); }
    window.moveUp = function(i){ if(i>0){ departments.splice(i-1,0,departments.splice(i,1)[0]); renderDepartments(); } }
    window.moveDown = function(i){ if(i<departments.length-1){ departments.splice(i+1,0,departments.splice(i,1)[0]); renderDepartments(); } }
    if(document.getElementById('departments-body')) renderDepartments();

    // Notification
    function showNotification(msg){
      const n = document.getElementById('notification');
      if(!n) return;
      n.textContent = msg; n.style.display='block'; n.style.opacity=1;
      setTimeout(()=>{ n.style.opacity=0; setTimeout(()=>n.style.display='none',300); },1800);
    }

    // Show/Hide Local Content Mechanism select
    window.toggleLocalContentMethod = function() {
      var cond = document.getElementById('local-content-cond');
      var div = document.getElementById('local-content-method-div');
      if(cond && div)
        div.style.display = cond.value === 'applies' ? 'block' : 'none';
    }

    // Modal logic (reused for all forms)
    window.openModal = function(){
      var bg = document.getElementById('modalBg');
      if(bg) bg.classList.add('active');
    }
    window.closeModal = function(){
      var bg = document.getElementById('modalBg');
      if(bg) bg.classList.remove('active');
    }
    window.submitForm = function(){
      closeModal();
      showNotification('تم إرسال الملف بنجاح!');
    }

    // If any input[type=file], show file name on selection (for all step forms)
    document.addEventListener('change',function(e){
      if(e.target.type==='file'){
        var fileName = e.target.files[0]? e.target.files[0].name : '';
        var parent = e.target.closest('form, .details-box, .upload-section');
        var fileUploadNameDiv = parent? parent.querySelector('.file-upload-name') : null;
        if(fileUploadNameDiv) fileUploadNameDiv.textContent = fileName;
      }
    });
}
